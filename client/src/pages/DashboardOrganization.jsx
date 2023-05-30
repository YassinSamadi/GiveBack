import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MuiCard from '../components/Card.jsx';
import MobileCard from '../components/MobileCard.jsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import FilterNeeds from '../components/FilterNeeds.jsx';
import FilterOrganizations from '../components/FilterOrganizations.jsx';
import FilterLocation from '../components/FilterLocation.jsx';
import NeedsPopup from '../components/PopupNeed.jsx';
import CardDetails from '../components/CardDetails.jsx';

export const DashboardOrganization = () => {
    const [products, setProducts] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    useEffect(() => {
        axios
        .get('/products')
        .then((response) => {
            setProducts(response.data);
        })
        .catch((error) => {
            console.error('Error fetching products:', error);
        });
    }, []);

    const handleCardClick = (product) => {
        setSelectedCard(product);
    };

    const handleClose = () => {
        setSelectedCard(null);
    };

    return (
        <Grid container spacing={2} style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <Grid item xs={12} md={3}>
            <div style={{display:"flex", justifyContent:"center"}}> <FilterNeeds/></div>
            <div style={{display:"flex", justifyContent:"center"}}> <FilterOrganizations/></div>
            <div style={{display:"flex", justifyContent:"center"}}> <FilterLocation/></div>
        </Grid>

        <CardDetails open={!!selectedCard} handleClose={handleClose} product={selectedCard} />

        <Grid item xs={12} md={9} style={{ paddingLeft: '0px'}}>
            <div>
            
            <div style={{display:"flex", justifyContent:"center"}}>
                <NeedsPopup />
                
            </div>
            <h1 style={{display:"flex", justifyContent:"center"}}>Active needs</h1>
            {products.map((product) =>
                isDesktop ? (
                <MuiCard
                    key={product.id}
                    imageSrc={require(`../${product.picture}`)}
                    title={product.name}
                    description="Card description goes here. Hello, my name is Yassin. Can you fill in this form?"
                    date="May 28, 2023"
                    number={42}
                    onClick={() => handleCardClick(product)}
                />
                ) : (
                <MobileCard
                    key={product.id}
                    imageSrc={require(`../${product.picture}`)}
                    title={product.name}
                    description="Card description goes here. Hello, my name is Yassin. Can you fill in this form?"
                    date="May 28, 2023"
                    number={42}
                    onClick={() => handleCardClick(product)}
                />
                )
            )}
            <h1 style={{display:"flex", justifyContent:"center"}}> History</h1>
            {products.map((product) =>
                isDesktop ? (
                <MuiCard
                    key={product.id}
                    imageSrc={require(`../${product.picture}`)}
                    title={product.name}
                    description="Card description goes here. Hello, my name is Yassin. Can you fill in this form?"
                    date="May 28, 2023"
                    number={42}
                    onClick={() => handleCardClick(product)}
                />
                ) : (
                <MobileCard
                    key={product.id}
                    imageSrc={require(`../${product.picture}`)}
                    title={product.name}
                    description="Card description goes here. Hello, my name is Yassin. Can you fill in this form?"
                    date="May 28, 2023"
                    number={42}
                    onClick={() => handleCardClick(product)}
                />
                )
            )}
            </div>
        </Grid>
        </Grid>
    );
};

export default DashboardOrganization;
