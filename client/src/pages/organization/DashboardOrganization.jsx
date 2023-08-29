import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import '../../style/organization/dashboardOrganization.scss';
import MuiCard from '../../components/organization/Card.jsx';
import NeedsPopup from '../../components/organization/AddNeed.jsx';
import CardDetails from '../../components/user/cardDetails.jsx';
import EditNeed from '../../components/organization/EditNeed.jsx';
import DeleteNeed from '../../components/organization/DeleteNeed.jsx';

export const DashboardOrganization = () => {
    const [needs, setNeeds] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [editingNeed, setEditingNeed] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [deletingNeed, setDeletingNeed] = useState(null);
    const [organization, setOrganization] = useState({});

    useEffect(() => {
        const org = JSON.parse(localStorage.getItem('organization'));
        setOrganization(org);

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
            setNeeds(response.data.filter(need => need.org_id === org.id));
        })
        .catch((error) => {
            console.error('Error fetching needs:', error);
        });
    }, []);


    const handleClose = () => {
        setSelectedCard(null);
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

    const handleDelete = (need) => {
        setDeletingNeed(need);
    };

    const activeNeeds = needs.filter(need => need.quantity_required > need.quantity_fulfilled);
    const fulfilledNeeds = needs.filter(need => need.quantity_required === need.quantity_fulfilled);
    
    const sortedActiveNeeds = activeNeeds.slice().sort((a, b) => new Date(b.date) - new Date(a.date));



    return (
        <>
            <div class="create-need">
                <NeedsPopup />
            </div>
            <Grid container spacing={2} sx={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
                <Grid item xs={12} md={6} sx={{ paddingLeft: '0px'}}>
                    <div>
                    <h1 className='need-title'>Active needs</h1>
                    {sortedActiveNeeds.map((need) => {
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
                                    onEdit={() => {handleEdit(need);}}
                                    onDelete={() => {handleDelete(need);}}
                                />
                        );
                    })}
                    </div>
                </Grid>
                <DeleteNeed open={!!deletingNeed} handleClose={() => setDeletingNeed(null)} need={deletingNeed} />
                <CardDetails open={!!selectedCard} handleClose={handleClose} product={selectedCard} />
                <EditNeed open={isEditing} handleClose={handleClose} need={editingNeed} products={products} />

                <Grid item xs={12} md={6}>
                <h1 className='need-title'>History</h1>
                    {fulfilledNeeds.map((need) => {
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
                        )
                    })}
                </Grid>
            </Grid>
        </>
    );
};

export default DashboardOrganization;
