import React, { useState, useEffect } from 'react';
import '../style/EditProfile.scss'; 
import axios from 'axios';

const EditProfile = () => {
    const [formData, setFormData] = useState({});
    const [user, setUser] = useState(null);

    const userId = JSON.parse(localStorage.getItem('user')).id;
    console.log(userId);
    useEffect(() => {
        // Fetch user data from your API or wherever it's stored
        async function fetchUserData() {
            try {
                const response = await axios.get(`/users/getUser?id=${userId}`); 
                setUser(response.data);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            await axios.put(`/users/updateUser?id=${userId}`, formData);  
            console.log('User updated successfully');
            //show a success message or redirect
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    if (!user) return null;

    return (
        <div className="edit-user-container">
            <div>{console.log("test")}</div>
            <h2>Edit User</h2>
            <div className="edit-user-form">
                <p>ID: {formData.id}</p>
                <input
                    type="text"
                    name="first_name"
                    value={formData.first_name || ''}
                    onChange={handleChange}
                    placeholder="First Name"
                />
                <input
                    type="text"
                    name="last_name"
                    value={formData.last_name || ''}
                    onChange={handleChange}
                    placeholder="Last Name"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                />
                <input
                    type="date"
                    name="date_of_birth"
                    value={formData.date_of_birth || ''}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="profile_pic"
                    value={formData.profile_pic || ''}
                    onChange={handleChange}
                    placeholder="Profile Picture URL"
                />
                <label>
                    In Need:
                    <input
                        type="checkbox"
                        name="inNeed"
                        checked={formData.inNeed || false}
                        onChange={handleChange}
                    />
                </label>
                <button
                    className="update-button"
                    onClick={handleSubmit}
                >
                    Update User
                </button>
            </div>
        </div>
    );
};

export default EditProfile;
