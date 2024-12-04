import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import seller from "../assets/images/seller.jpg";
import smilee from "../assets/images/smile.png";
import useri from "../assets/images/user.png";
import email from "../assets/images/email.png";

const UserDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};
  const productTypes = [
    "Villa",
    "Flat",
    "Land",
    "Mobile Home",
    "Bungalow",
    "Condo",
    "Penthouse",
    "Watch",
  ];

  const [viewMode, setViewMode] = useState("buyer");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState({
    rooms: "",
    bathrooms: "",
    maxPrice: "",
    location: "",
    nearby: "",
    propertyType: "",
  });

  const [properties, setProperties] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    document.body.classList.add("hide-navbar");

    return () => {
      document.body.classList.remove("hide-navbar");
    };
  }, []);

  const fetchAllProperties = async () => {
    try {
      const response = await axios.get("http://localhost:5000/properties");
      setProperties(response.data);
    } catch (error) {
      toast.error("Error fetching properties.");
    }
  };

  useEffect(() => {
    fetchAllProperties();
  }, []);

  const handleLogout = () => {
    toast.info("You have been logged out.");
    navigate("/login");
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
    setSelectedProperty(null);
  };

  const capitalizeText = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]:
        name === "propertyType" || name === "location" || name === "nearby"
          ? capitalizeText(value)
          : value,
    }));
  };

  const applyFilters = () => {
    return properties.filter((property) => {
      const matchRooms = filter.rooms ? property.rooms >= filter.rooms : true;
      const matchBathrooms = filter.bathrooms
        ? property.bathrooms >= filter.bathrooms
        : true;
      const matchPrice = filter.maxPrice
        ? property.price <= filter.maxPrice
        : true;
      const matchLocation = filter.location
        ? property.location
            .toLowerCase()
            .includes(filter.location.toLowerCase())
        : true;
      const matchNearby = filter.nearby
        ? property.nearby.toLowerCase().includes(filter.nearby.toLowerCase())
        : true;
      const matchPropertyType = filter.propertyType
        ? property.propertyType === filter.propertyType
        : true;

      return (
        matchRooms &&
        matchBathrooms &&
        matchPrice &&
        matchLocation &&
        matchNearby &&
        matchPropertyType
      );
    });
  };

  const handleContactSeller = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  const handleSubmitContactForm = (e) => {
    e.preventDefault();
    toast.success("Message sent to the seller.");
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePostProperty = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", capitalizeText(e.target.title.value));
    formData.append("price", e.target.price.value);
    formData.append("location", capitalizeText(e.target.location.value));
    formData.append("rooms", e.target.rooms.value);
    formData.append("bathrooms", e.target.bathrooms.value);
    formData.append("nearby", capitalizeText(e.target.nearby.value));
    formData.append("description", capitalizeText(e.target.description.value));
    formData.append("contactNumber", e.target.contactNumber.value);
    formData.append("image", e.target.image.files[0]);
    formData.append("contactEmail", user.email);
    formData.append("postedBy", user._id);
    formData.append(
      "propertyType",
      capitalizeText(e.target.propertyType.value)
    );

    try {
      const response = await axios.post(
        "http://localhost:5000/properties",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setProperties([...properties, response.data]);
      toast.success("Property posted successfully.");

      navigate(0);
    } catch (error) {
      toast.error("Error posting property.");
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/properties/${propertyId}`
      );
      if (response.status === 200) {
        setProperties(
          properties.filter((property) => property._id !== propertyId)
        );
        toast.success("Property deleted successfully.");
      } else {
        toast.error("Failed to delete property.");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Error deleting property.");
    }
  };

  const handleEditProperty = (property) => {
    setSelectedProperty(property);
    setIsEditing(true);
    setViewMode("seller"); // Switch to seller view to edit
  };

  const handleSaveProperty = async (e) => {
    e.preventDefault();

    if (!selectedProperty || !selectedProperty._id) {
      toast.error('Invalid property ID');
      return;
    }

    const formData = new FormData();
    formData.append("title", capitalizeText(e.target.title.value));
    formData.append("price", e.target.price.value);
    formData.append("location", capitalizeText(e.target.location.value));
    formData.append("rooms", e.target.rooms.value);
    formData.append("bathrooms", e.target.bathrooms.value);
    formData.append("nearby", capitalizeText(e.target.nearby.value));
    formData.append("description", capitalizeText(e.target.description.value));
    formData.append("contactNumber", e.target.contactNumber.value);
    formData.append("propertyType", capitalizeText(e.target.propertyType.value));

    if (e.target.image.files[0]) {
      formData.append("image", e.target.image.files[0]);
    }

    try {
      console.log('Sending PATCH request with ID:', selectedProperty._id); // Debugging: Log the ID being sent
      const response = await axios.patch(
        `http://localhost:5000/properties/${selectedProperty._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setProperties(
        properties.map((property) =>
          property._id === selectedProperty._id ? response.data : property
        )
      );
      toast.success("Property updated successfully.");
      setIsEditing(false);
      setSelectedProperty(null);
      setViewMode("buyer"); // Switch back to buyer view after editing
    } catch (error) {
      console.error('Error updating property:', error);
      toast.error("Error updating property.");
    }
  };

  const filteredProperties = applyFilters();

  const handleInputCapitalize = (e) => {
    e.target.value = capitalizeText(e.target.value);
  };

  return (
    <div className="user-details-page">
      <div className="user-details-container">
        <h2>
          Welcome <img src={smilee} alt="" className="smile" />
        </h2>
        <div className="user-cardmain">
          <h2 className="user-card">
            <img src={useri} alt="" className="smile" />
            Username : {user?.username}
          </h2>
          <p className="user-card">
            <img src={email} className="smile" alt="" /> Email: {user?.email}
          </p>
        </div>
        <div className="user-actions">
          <button onClick={() => handleViewChange("buyer")}>Buyer</button>
          <button onClick={() => handleViewChange("seller")}>Seller</button>
        </div>

        <div className="content-wrapper">
          <div className="content">
            {viewMode === "buyer" && (
              <div className="buy-property-section">
                <h3>Filter and View Properties</h3>
                <div className="filter-options">
                  <select
                    name="propertyType"
                    required
                    value={filter.propertyType}
                    onChange={handleFilterChange}
                    onInput={handleInputCapitalize}
                  >
                    <option value="">Select Property Type</option>
                    {productTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="Min Rooms"
                    name="rooms"
                    value={filter.rooms}
                    onChange={handleFilterChange}
                    onInput={handleInputCapitalize}
                  />
                  <input
                    type="number"
                    placeholder="Min Bathrooms"
                    name="bathrooms"
                    value={filter.bathrooms}
                    onChange={handleFilterChange}
                    onInput={handleInputCapitalize}
                  />
                  <input
                    type="number"
                    placeholder="Max Price"
                    name="maxPrice"
                    value={filter.maxPrice}
                    onChange={handleFilterChange}
                    onInput={handleInputCapitalize}
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    name="location"
                    value={filter.location}
                    onChange={handleFilterChange}
                    onInput={handleInputCapitalize}
                  />
                  <input
                    type="text"
                    placeholder="Nearby Features"
                    name="nearby"
                    value={filter.nearby}
                    onChange={handleFilterChange}
                    onInput={handleInputCapitalize}
                  />
                </div>

                {filteredProperties.length > 0 ? (
                  <div className="filter">
                    <div className="property-listings">
                      {filteredProperties.map((property) => (
                        <div key={property._id} className="property-card">
                          <img
                            src={`http://localhost:5000/${property.image}`}
                            alt={property.title}
                          />
                          <h4>{property.title}</h4>
                          <p>{property.price}</p>
                          <p>{property.location}</p>
                          <p>
                            {property.rooms} rooms, {property.bathrooms}{" "}
                            bathrooms
                          </p>
                          <p>Nearby: {property.nearby}</p>
                          <p>Contact Number: {property.contactNumber}</p>
                          <button onClick={() => handleContactSeller(property)}>
                            Contact Seller
                          </button>
                          <br />
                          {user._id === property.postedBy && (
                            <>
                              <button
                                onClick={() =>
                                  handleDeleteProperty(property._id)
                                }
                                className="delete"
                              >
                                Delete
                              </button>
                              <br />
                              <button
                                onClick={() => handleEditProperty(property)}
                                className="EditProperty"
                              >
                                Edit
                              </button>
                              <br />
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p>No properties found matching your criteria.</p>
                )}
              </div>
            )}

            {viewMode === "seller" && (
              <div className="sell-property-section">
                <h3>{isEditing ? "Edit Property" : "Post a New Property"}</h3>
                <div className="form-image-container">
                  <form
                    onSubmit={isEditing ? handleSaveProperty : handlePostProperty}
                  >
                    <input
                      type="text"
                      name="title"
                      placeholder="Property Title"
                      required
                      onInput={handleInputCapitalize}
                      defaultValue={isEditing ? selectedProperty.title : ""}
                    />
                    <input
                      type="number"
                      name="price"
                      placeholder="Price"
                      required
                      onInput={handleInputCapitalize}
                      defaultValue={isEditing ? selectedProperty.price : ""}
                    />
                    <input
                      type="text"
                      name="location"
                      placeholder="Location"
                      required
                      onInput={handleInputCapitalize}
                      defaultValue={isEditing ? selectedProperty.location : ""}
                    />
                    <select
                      name="propertyType"
                      required
                      onInput={handleInputCapitalize}
                      defaultValue={isEditing ? selectedProperty.propertyType : ""}
                    >
                      <option value="">Select Property Type</option>
                      {productTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      name="rooms"
                      placeholder="Rooms"
                      required
                      onInput={handleInputCapitalize}
                      defaultValue={isEditing ? selectedProperty.rooms : ""}
                    />
                    <input
                      type="number"
                      name="bathrooms"
                      placeholder="Bathrooms"
                      required
                      onInput={handleInputCapitalize}
                      defaultValue={isEditing ? selectedProperty.bathrooms : ""}
                    />
                    <input
                      type="text"
                      name="nearby"
                      placeholder="Nearby Features"
                      required
                      onInput={handleInputCapitalize}
                      defaultValue={isEditing ? selectedProperty.nearby : ""}
                    />
                    <input
                      type="text"
                      name="contactNumber"
                      placeholder="Contact Number"
                      required
                      onInput={handleInputCapitalize}
                      defaultValue={isEditing ? selectedProperty.contactNumber : ""}
                    />
                    <textarea
                      name="description"
                      placeholder="Description"
                      required
                      onInput={handleInputCapitalize}
                      defaultValue={isEditing ? selectedProperty.description : ""}
                    ></textarea>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                    />
                    <button type="submit" className="button">
                      {isEditing ? "Save Property" : "Post Property"}
                    </button>
                  </form>
                  <div className="seller-image">
                    <img src={seller} alt="Seller" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <button onClick={handleLogout} className="logout">
          Logout
        </button>

        {showModal && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="modal-close" onClick={handleCloseModal}>
                &times;
              </span>
              <h3>Contact Seller</h3>
              <h4>Property: {selectedProperty?.title}</h4>
              <form onSubmit={handleSubmitContactForm}>
                <label>Buyer Email</label>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={user?.email}
                  readOnly
                />
                <label>Seller Email</label>
                <input
                  type="email"
                  placeholder="Seller Email"
                  value={selectedProperty?.contactEmail}
                  readOnly
                />
                <textarea placeholder="Your Message" required></textarea>
                <button type="submit">Send Message</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
