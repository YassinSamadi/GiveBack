import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultLogo from '../../assets/miscellaneous/profile-pic.jpg';
import StyledButton from '../../components/ui/StyledButton';
import '../../style/user/editProfile.scss'; 
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
    const [logo, setLogo] = useState(null);

    const [address, setAddress] = useState(null);

    const org_logo = organization ? organization.logo : '';

    useEffect(() => {
        async function fetchOrganizationData() {
            try {
                const response = await axios.get('/organization/getOrganization');
                const organizationData = response.data[0];
                const addressResponse = await axios.get(`/address/getAddressOrganization/${organizationData.address_id}`);
                const addressData = addressResponse.data[0];
                setFormData({
                    ...formData,
                    name: organizationData.name,
                    website_url: organizationData.website_url,
                    address: {
                        street: addressData.street,
                        number: addressData.number,
                        city: addressData.city,
                        postal_code: addressData.postal_code,
                        country: addressData.country
                    }
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

        if (type === 'file') {
            if (files && files.length > 0) { // Only proceed if files are selected
                const uniqueFilename = generateUniqueFilename(files[0]?.name);
                setLogo({ file: files[0], uniqueFilename });
                setFormData({ ...formData, logo: uniqueFilename });
            }
        } else {
            const newValue = type === 'checkbox' ? checked : value;
            if (name.startsWith('address.')) {
                const addressField = name.split('.')[1];
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
        }
    };


    const handleSubmit = async () => {
        try {
            if (logo) {
                const formDataWithLogo = new FormData();
                formDataWithLogo.append('logo', logo.file, logo.uniqueFilename);
                const imageResponse = await axios.post('/upload/logo', formDataWithLogo);
                const imageName = imageResponse.data.filename;
                setFormData({ ...formData, logo: imageName });
                formData.logo = imageName;

                const updateOrganization = {
                    ...organization,
                    name: formData.name,
                    website_url: formData.website_url,
                    logo: imageName,
                    password: formData.password,
                    address: {
                        id: formData.address.id,
                        street: formData.address.street,
                        number: formData.address.number,
                        city: formData.address.city,
                        postal_code: formData.address.postal_code,
                        country: formData.address.country
                    }
                };

                const updateAddress = {
                    ...address,
                    id: address.id,
                    street: formData.address.street,
                    number: formData.address.number,
                    city: formData.address.city,
                    postal_code: formData.address.postal_code,
                    country: formData.address.country
                }

                localStorage.setItem('organization', JSON.stringify(updateOrganization));
                setOrganization({ ...organization, logo: imageName });
                setAddress({ ...address, updateAddress })

                await axios.put(`/organization/updateOrganization`, formData);

                await axios.put(`/address/updateAddress`, {
                    id: address.id,
                    street: formData.address.street,
                    number: formData.address.number,
                    city: formData.address.city,
                    postal_code: formData.address.postal_code,
                    country: formData.address.country
                });

                setOrganization(updateOrganization);
                setAddress(updateAddress)
                localStorage.setItem('organization', JSON.stringify(updateOrganization));
            }
            else {
                await axios.put(`/organization/updateOrganization`, {
                    id: organization.id,
                    name: formData.name,
                    password: formData.password,
                    website_url: formData.website_url
                });

                await axios.put(`/address/updateAddress`, {
                    id: address.id,
                    street: formData.address.street,
                    number: formData.address.number,
                    city: formData.address.city,
                    postal_code: formData.address.postal_code,
                    country: formData.address.country
                });
            }
            window.location.reload();
        } catch (error) {
            console.error('Error updating organization:', error);
        }
    };

    if (!organization) return null;

    return (
        <div className="edit-user-container">
            <h2>Edit Organization</h2>

            <div className="edit-user-form">
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
                    src={org_logo ? `/assets/uploads/logo/${org_logo}` : defaultLogo}
                    alt="User Profile"
                    className="user-profile-image"
                />
                <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    name="logo"
                    onChange={handleChange}
                    className="input-field"
                />
                <label>Address</label>
                <input
                    type="text"
                    name="address.street"
                    value={formData.address.street || ''}
                    onChange={handleChange}
                    placeholder="Street"
                    className="input-field"
                />
                <input
                    type="text"
                    name="address.number"
                    value={formData.address.number || ''}
                    onChange={handleChange}
                    placeholder="Number"
                    className="input-field"
                />

                <input
                    type="text"
                    name="address.city"
                    value={formData.address.city || ''}
                    onChange={handleChange}
                    placeholder="City"
                    className="input-field"
                />
                <input
                    type="text"
                    name="address.postal_code"
                    value={formData.address.postal_code || ''}
                    onChange={handleChange}
                    placeholder="Postal Code"
                    className="input-field"
                />
                <input
                    type="text"
                    name="address.country"
                    value={formData.address.country || ''}
                    onChange={handleChange}
                    placeholder="Country"
                    className="input-field"
                />
                <StyledButton  onClick={handleSubmit} text={'Update'}/>
            </div>
        </div>
    );
};

export default EditProfileOrg;
