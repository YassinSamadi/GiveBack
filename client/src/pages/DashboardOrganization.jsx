import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MuiCard from '../components/Card.jsx';
import MobileCard from '../components/MobileCard.jsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import NeedsPopup from '../components/PopupNeed.jsx';
import CardDetails from '../components/CardDetails.jsx';

export const DashboardOrganization = () => {
    const [needs, setNeeds] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [organization, setOrganization] = useState({});

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

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

    const handleCardClick = (need) => {
        setSelectedCard(need);
    };

    const handleClose = () => {
        setSelectedCard(null);
    };

    const getProductByNeed = (need) => {
        return products.find(product => product.id === need.product_id) || {};
    };
    const handleEdit = (need) => {
        console.log("Edit need with id:", need.id);
       
    };
    
    const handleDelete = (need) => {
        console.log("Delete need with id:", need.id);
        
    };
    

    
    const activeNeeds = needs.filter(need => need.quantity_required > need.quantity_fulfilled);
    const fulfilledNeeds = needs.filter(need => need.quantity_required === need.quantity_fulfilled);

    return (
        <>
        <div style={{display:"flex", justifyContent:"center", marginTop:25}}>
            <NeedsPopup />
        </div>
        <Grid container spacing={2} style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
            <Grid item xs={12} md={6} style={{ paddingLeft: '0px'}}>
                <div>
                <h1 style={{display:"flex", justifyContent:"center"}}>Active needs</h1>
                {activeNeeds.map((need) => {
                    const product = getProductByNeed(need);
                    return (
                        isDesktop ? (
                        <MuiCard
                            key={need.id}
                            imageSrc={product && product.picture ? require(`../${product.picture}`) : require('../assets/products/sugar.jpg')}                            
                            title={need.title}
                            description={need.description}
                            nameOrganization={organization.name || 'Organization'}
                            date={need.date}
                            required={need.quantity_required}
                            fulfilled={need.quantity_fulfilled}
                            onClick={() => handleCardClick(need)}
                            showActions={true}
                            onEdit={() => handleEdit(need)}
                            onDelete={() => handleDelete(need)}
                        />
                        
                        ) : (
                        <MobileCard
                            key={need.id}
                            imageSrc={product && product.picture ? require(`../${product.picture}`) : require('../assets/products/sugar.jpg')}                            
                            title={need.title}
                            description={need.description}
                            nameOrganization={organization.name || 'Organization'}
                            date={need.date}
                            required={need.quantity_required}
                            fulfilled={need.quantity_fulfilled}
                            onClick={() => handleCardClick(need)}
                        />
                        )
                    )
                })}
                </div>
            </Grid>
            <CardDetails open={!!selectedCard} handleClose={handleClose} product={selectedCard} />

            <Grid item xs={12} md={6}>
                <h1 style={{display:"flex", justifyContent:"center"}}> History</h1>
                {fulfilledNeeds.map((need) => {
                    const product = getProductByNeed(need);
                    return (
                        isDesktop ? (
                        <MuiCard
                            key={need.id}
                            imageSrc={product && product.picture ? require(`../${product.picture}`) : require('../assets/products/sugar.jpg')}                            
                            title={need.title}
                            description={need.description}
                            date={need.date}
                            required={need.quantity_required}
                            fulfilled={need.quantity_fulfilled}
                        />
                        ) : (
                        <MobileCard
                            key={need.id}
                            imageSrc={product && product.picture ? require(`../${product.picture}`) : require('../assets/products/sugar.jpg')}                            
                            title={need.title}
                            description={need.description}
                            date={need.date}
                            required={need.quantity_required}
                            fulfilled={need.quantity_fulfilled}
                        />
                        )
                    )
                })}
            </Grid>
            <CardDetails open={!!selectedCard} handleClose={handleClose} product={selectedCard} />
        </Grid>
        </>
    );
};

export default DashboardOrganization;
