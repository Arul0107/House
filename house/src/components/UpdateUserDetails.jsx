import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const UpdateUserDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};

  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`http://localhost:5000/users/${user.email}`, {
        username: formData.username,
        newEmail: formData.email !== user.email ? formData.email : undefined,
        password: formData.password || undefined,
      });

      toast.success('User details updated successfully.');
      navigate('/userdetails', { state: { user: response.data.user } });
    } catch (error) {
      console.error('Error updating user details:', error);
      toast.error('Error updating user details.');
    }
  };

  return (
    <div className="update-user-details-page">
      <h2>Update Your Details</h2>
      <form onSubmit={handleUpdateUser}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-control"
            placeholder="Username"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <label>New Password (optional)</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            placeholder="New Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Details</button>
      </form>
    </div>
  );
};

export default UpdateUserDetails;
