import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import '../../style/organization/dashboardOrganization.scss';
import MuiCard from '../../components/organization/Card.jsx';
import NeedsPopup from '../../components/organization/AddNeed.jsx';
import EditNeed from '../../components/organization/EditNeed.jsx';
import { OrganizationAuthContext } from '../../context/authContextOrganizations';
import DeletePopup from '../../components/organization/DeletePopUp';


export const DashboardOrganization = () => {
    const [needs, setNeeds] = useState([]);
    const [products, setProducts] = useState([]);
    const [editingNeed, setEditingNeed] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const {organization} = useContext(OrganizationAuthContext);
    const [currentlyDeletingNeed, setCurrentlyDeletingNeed] = useState(null);

    useEffect(() => {

        axios
            .get('/products')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });

        axios
        .get('/needs/getallneeds')
        .then((response) => {
            setNeeds(response.data);
        })
        .catch((error) => {
            console.error('Error fetching needs:', error);
        });
    }, []);


    const handleClose = () => {
        setIsEditing(false);
        setEditingNeed(null);
    };

    const getProductByNeed = (need) => {
        return products.find(product => product.id === need.product_id) || {};
    };

    const handleEdit = (need) => {
        setEditingNeed(need);
        setIsEditing(true);
    };
    const handleEditSuccess = (editedNeed) => {
        const updatedNeeds = needs.map((need) => {
            return need.id === editedNeed.id ? editedNeed : need;
        });
        setNeeds(updatedNeeds);
        handleClose();
    };
    
    

    const handleDeleting = (need) => {
    setCurrentlyDeletingNeed(need);
    };

    const activeNeeds = needs.filter(need => need.quantity_required > need.quantity_fulfilled);
    const fulfilledNeeds = needs.filter(need => need.quantity_required === need.quantity_fulfilled);
    
    const sortedActiveNeeds = activeNeeds.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

    const handleDelete = () => {

        axios
            .put(`/needs/deleteNeed?id=${currentlyDeletingNeed.id}`)
            .then(response => {
                setNeeds(needs.filter(need => need.id !== currentlyDeletingNeed.id));
                setCurrentlyDeletingNeed(null);
            })
            .catch(err => console.error('Error deleting need:', err));
    };

    return (
        <>
            <div className="create-need">
                <NeedsPopup />
            </div>
            <Grid container spacing={2} sx={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
                <Grid item xs={12} md={6} sx={{ paddingLeft: '0px' }}>
                    <div>
                        <h1 className='need-title'>Active needs</h1>
                        {sortedActiveNeeds.length > 0 ? (
                            sortedActiveNeeds.map((need) => {
                                const product = getProductByNeed(need);
                                return (
                                    <MuiCard
                                        key={need.id}
                                        imageSrc={product && product.picture ? require(`../../${product.picture}`) : require('../../assets/products/sugar.jpg')}
                                        title={need.title}
                                        description={need.description}
                                        nameOrganization={organization.name || 'Organization'}
                                        date={need.date}
                                        required={need.quantity_required}
                                        fulfilled={need.quantity_fulfilled}
                                        showActions={true}
                                        onEdit={() => { handleEdit(need); }}
                                        onDelete={() => { handleDeleting(need); }}
                                    />
                                );
                            })
                        ) : (
                            <p className='center-empty'>No active needs yet</p>
                        )}
                    </div>
                </Grid>
                <DeletePopup
                    open={!!currentlyDeletingNeed}
                    handleClose={() => setCurrentlyDeletingNeed(null)}
                    handleDelete={handleDelete}
                    title={'need'}
                    content={'need'}
                />

                <EditNeed
                    open={isEditing}
                    handleClose={handleClose}
                    need={editingNeed}
                    products={products}
                    onEditSuccess={handleEditSuccess} 
                />

                <Grid item xs={12} md={6}>
                    <h1 className='need-title'>History</h1>
                    {fulfilledNeeds.length > 0 ? (
                        fulfilledNeeds.map((need) => {
                            const product = getProductByNeed(need);
                            return (
                                <MuiCard
                                    key={need.id}
                                    imageSrc={product && product.picture ? require(`../../${product.picture}`) : require('../../assets/products/sugar.jpg')}
                                    title={need.title}
                                    description={need.description}
                                    nameOrganization={organization.name || 'Organization'}
                                    date={need.date}
                                    required={need.quantity_required}
                                    fulfilled={need.quantity_fulfilled}
                                    history={true}
                                />
                            );
                        })
                    ) : (
                        <p className='center-empty'>No history yet</p>
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default DashboardOrganization;
