import React, { useState, useEffect } from 'react';
// import '../../style/organization/editProfile.scss';
import axios from 'axios';
// import defaultLogo from '../../assets/miscellaneous/logo.jpg';
import defaultLogo from '../../assets/miscellaneous/profile-pic.jpg';

const EditProfileOrg = () => {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        website_url: '',
        logo: '',
        address: {
            street: '',
            number: '',
            city: '',
            postal_code: '',
            country: ''
        }
    });

    const [organization, setOrganization] = useState(null);
    const [logo , setLogo] = useState(null);

    const [address, setAddress] = useState(null);

    const org_logo = organization ? organization.logo : '';

    useEffect(() => {
        async function fetchOrganizationData() {
            try {
                const response = await axios.get('/organization/getOrganization');
                const organizationData = response.data[0];
                const addressResponse = await axios.get(`/address/getAddressOrganization/${organizationData.address_id}`);
                const addressData = addressResponse.data[0];
                console.log(addressData);
                setFormData({
                    ...formData,
                    name: organizationData.name,
                    website_url: organizationData.website_url,
                    street: addressData.street,
                    number: addressData.number,
                    city: addressData.city,
                    postal_code: addressData.postal_code,
                    country: addressData.country
                });
            
                setOrganization(organizationData);
                setAddress(addressData);
            } catch (error) {
                console.error('Error fetching organization data:', error);
            }
        }

        fetchOrganizationData();
    }, []);

    const generateUniqueFilename = (originalFilename) => {
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(7);
        const extension = originalFilename.split('.').pop();
        return `${timestamp}-${randomString}.${extension}`;
    };


    const handleChange = (e) => {
        const { name, type, value, files, checked } = e.target;
        const newValue = type === 'file' ? files[0] : type === 'checkbox' ? checked : value;
        console.log('name',name);
        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            console.log('ad',addressField);
            setFormData((prevData) => ({
                ...prevData,
                address: {
                    ...prevData.address,
                    [addressField]: newValue
                }
            }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: newValue }));
        }
    };
    

    const handleSubmit = async () => {
        try {
            await axios.put(`/organizations/updateOrganization`, {
                id: organization.id,
                name: formData.name,
                password: formData.password,
                logo: formData.logo,
                website_url: formData.website_url
            });

            await axios.put(`/addresses/updateAddress`, {
                id: address.id,
                street: formData.address.street,
                number: formData.address.number,
                city: formData.address.city,
                postal_code: formData.address.postal_code,
                country: formData.address.country
            });
        } catch (error) {
            console.error('Error updating organization:', error);
        }
    };

    if (!organization) return null;

    return (
        <div className="edit-organization-container">
            <h2>Edit Organization</h2>

            <div className="edit-organization-form">
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    placeholder="Organization Name"
                    className="input-field"
                />
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password || ''}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="input-field"
                />
                <label>Website URL</label>
                <input
                    type="text"
                    name="website_url"
                    value={formData.website_url || ''}
                    onChange={handleChange}
                    placeholder="Website URL"
                    className="input-field"
                />
                <label>Organization logo</label>
                <img
                    src={org_logo ? `/assets/uploads/profilepic/${org_logo}` : defaultLogo}
                    alt="User Profile"
                    className="user-profile-image"
                />
                <label>Address</label>
                <input
                    type="text"
                    name="address.street"
                    value={formData.street || ''}
                    onChange={handleChange}
                    placeholder="Street"
                    className="input-field"
                />
                <input
                    type="text"
                    name="address.number"
                    value={formData.number || ''}
                    onChange={handleChange}
                    placeholder="Number"
                    className="input-field"
                />
                
                <input
                    type="text"
                    name="address.city"
                    value={formData.city || ''}
                    onChange={handleChange}
                    placeholder="City"
                    className="input-field"
                />
                <input
                    type="text"
                    name="address.postal_code"
                    value={formData.postal_code || ''}
                    onChange={handleChange}
                    placeholder="Postal Code"
                    className="input-field"
                />
                <input
                    type="text"
                    name="address.country"
                    value={formData.country || ''}
                    onChange={handleChange}
                    placeholder="Country"
                    className="input-field"
                />
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

export default EditProfileOrg;
