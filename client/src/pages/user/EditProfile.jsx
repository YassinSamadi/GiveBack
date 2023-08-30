import React, { useState, useEffect } from 'react';
import '../../style/user/editProfile.scss'; 
import axios from 'axios';
import defaultProfilePic from '../../assets/miscellaneous/profile-pic.jpg';

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
    const [profilePicFile, setProfilePicFile] = useState(null);

    const user_profilepic = user ? user.profile_pic : '';
    
    useEffect(() => {
        
        async function fetchUserData() {
            try {
                const response = await axios.get(`/users/getUser`);
                const userData = response.data[0]; 
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
    }, []);

    const handleChange = (e) => {
        const { name, type, value, files } = e.target;
    
        if (type === 'file') {
            if (files && files.length > 0) { // Only proceed if files are selected
                const uniqueFilename = generateUniqueFilename(files[0]?.name);
                setProfilePicFile({ file: files[0], uniqueFilename });
                setFormData({ ...formData, profile_pic: uniqueFilename });
            }
        } else {
            const newValue = type === 'checkbox' ? e.target.checked : value;
            setFormData({ ...formData, [name]: newValue });
        }
    };
    
    

    const generateUniqueFilename = originalFilename => {
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(7);
        const extension = originalFilename.split('.').pop();
        return `${timestamp}-${randomString}.${extension}`;
    };

    const handleSubmit = async () => {
        try {
            if (profilePicFile) {
                const formDataWithProfilePic = new FormData();
                formDataWithProfilePic.append('profile_pic', profilePicFile.file, profilePicFile.uniqueFilename);
                const imageResponse = await axios.post('/upload/profilepic', formDataWithProfilePic);
                const imageName = imageResponse.data.filename;
                setFormData({ ...formData, profile_pic: imageName });
                formData.profile_pic = imageName;
    
                const updatedUser = {
                    ...user,
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    profile_pic: imageName,
                    password: formData.password,
                    inNeed: formData.inNeed
                };
    
                localStorage.setItem('user', JSON.stringify(updatedUser)); 
                setUser({ ...user, profile_pic: imageName });
    
                await axios.put(`/users/updateUser`, formData);
    
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser)); 
            } else {
                const updatedUser = {
                    ...user,
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    password: formData.password,
                    inNeed: formData.inNeed
                };
    
                await axios.put(`/users/updateUser`, formData);
    
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser)); 
            }
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
                <img
                    src={user_profilepic ? `/assets/uploads/profilepic/${user_profilepic}` : defaultProfilePic}
                    alt="User Profile"
                    className="user-profile-image"
                    />
                <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    name="profile_pic"
                    onChange={handleChange}
                    className="input-field"
                />
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
