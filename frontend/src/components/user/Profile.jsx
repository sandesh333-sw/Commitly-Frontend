import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import HeatMap from "./HeatMap";
import "./profile.css";
import logo from "../../assets/logoblack.png";
import { useAuth } from "../../../authUtils";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: ""
  });
  
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAuth();

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:3000/user/${currentUser}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setUserData(response.data);
        setFormData({
          username: response.data.username || "",
          email: response.data.email || "",
          bio: response.data.bio || ""
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/user/update/${currentUser}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setUserData(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setCurrentUser(null);
    navigate("/login");
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="profile-container">
          <div className="loading">Loading profile...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="profile-container">
          <div className="error-message">{error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>
        
        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-avatar">
              <img src={logo} alt="Profile" />
            </div>
            
            {isEditing ? (
              <form className="profile-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    readOnly
                  />
                  <small>Email cannot be changed</small>
                </div>
                
                <div className="form-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Tell us about yourself"
                  />
                </div>
                
                <div className="profile-actions">
                  <button 
                    type="button" 
                    className="cancel-btn" 
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="save-btn">
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-info">
                <h2>{userData.username}</h2>
                <p className="profile-email">{userData.email}</p>
                
                <div className="profile-bio">
                  <h3>Bio</h3>
                  <p>{userData.bio || "No bio provided yet."}</p>
                </div>
                
                <button 
                  className="edit-profile-btn" 
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
          
          <div className="profile-activity">
            <h2>Activity</h2>
            <div className="activity-heatmap">
              <HeatMap userId={currentUser} />
            </div>
            
            <div className="activity-stats">
              <div className="stat-card">
                <h3>Repositories</h3>
                <p className="stat-number">{userData.repositories?.length || 0}</p>
              </div>
              
              <div className="stat-card">
                <h3>Commits</h3>
                <p className="stat-number">{userData.totalCommits || 0}</p>
              </div>
              
              <div className="stat-card">
                <h3>Issues</h3>
                <p className="stat-number">{userData.totalIssues || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;