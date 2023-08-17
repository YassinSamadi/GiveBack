import React, { useState, useEffect } from 'react';
import '../style/EditProfile.scss'; 
import axios from 'axios';

const EditProfile = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        password: '',
        email: '',
        profile_pic: '',
        inNeed: false
    });
    const [user, setUser] = useState(null);

    const userId = JSON.parse(localStorage.getItem('user')).id;
    console.log(userId);
    useEffect(() => {
        // Fetch user data from your API or wherever it's stored
        async function fetchUserData() {
            try {
                const response = await axios.get(`/users/getUser?id=${userId}`);
                const userData = response.data[0]; // Assuming the API returns an array
                setFormData({
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    email: userData.email,
                    profile_pic: userData.profile_pic,
                    inNeed: userData.inNeed
                });
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        
        fetchUserData();
    }, [userId]);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async () => {
        try {
            await axios.put(`/users/updateUser?id=${userId}`, formData);
            console.log('User updated successfully');
    
            // Update local storage with the new user data
            const updatedUser = {
                ...user,
                first_name: formData.first_name,
                last_name: formData.last_name,
                profile_pic: formData.profile_pic,
                inNeed: formData.inNeed
            };
            
            localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
    

    if (!user) return null;

    return (
        <div className="edit-user-container">
            <h2>Edit User</h2>
            
            <div className="edit-user-form">
                
                <label>First name</label>
                <input
                    type="text"
                    name="first_name"
                    value={formData.first_name || ''}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="input-field"
                />
                <label>Last name</label>
                <input
                    type="text"
                    name="last_name"
                    value={formData.last_name || ''}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="input-field"
                />
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    readOnly
                    className="input-field"
                />
                <label>Password</label>
                <input type="password"
                    name="password"
                    value={formData.password || ''}
                    onChange={handleChange}
                    placeholder="••••••••" 
                    className="input-field"/>
                <label>Profile Picture</label>
                {/* <input
                    type="file"
                    accept='.jpg, .jpeg, .png'
                    name="profile_pic"
                    value={formData.profile_pic || ''}
                    onChange={handleChange}
                    placeholder="Profile Picture URL"
                    className="input-field"
                /> */}
                <label className="in-need-label">
                    In Need:
                    <input
                        type="checkbox"
                        name="inNeed"
                        checked={formData.inNeed || false}
                        onChange={handleChange}
                        className="checkbox-field"
                    />
                </label>
                <button
                    className="update-button"
                    onClick={handleSubmit}
                >
                    Update
                </button>
            </div>
        </div>
    );
};

export default EditProfile;
