import React, { useEffect, useState } from 'react';
import axios from 'axios';

import MobileCard from '../components/MobileCard.jsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import FilterNeeds from '../components/FilterNeeds.jsx';
import FilterOrganizations from '../components/FilterOrganizations.jsx';
import FilterLocation from '../components/FilterLocation.jsx';
import CardDetails from '../components/CardDetails.jsx';
import CardNeedUser from '../components/CardNeedUser.jsx';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);


export const Dashboard = () => {
  const [needs, setNeeds] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    axios
      .get('/needs/getspecificneed') 
      .then((response) => {
        setNeeds(response.data);
        console.log(response.data)
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

  return (
    <Grid container spacing={2} style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
      <Grid item xs={12} md={3}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <FilterNeeds />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <FilterOrganizations />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <FilterLocation />
        </div>
      </Grid>

      <CardDetails open={!!selectedCard} handleClose={handleClose} product={selectedCard} />

      <Grid item xs={12} md={9} style={{ paddingLeft: '0px' }}>
        <div>
          {needs
            .sort((a, b) => new Date(b.date) - new Date(a.date)) 
            .map((need) =>
              isDesktop ? (
                <CardNeedUser
                  key={need.id}
                  imageSrc={require(`../${need.product_picture}`)}
                  title={need.title}
                  description={need.description}
                  date={dayjs(need.date).fromNow()} 
                  fulfilled={need.quantity_fulfilled}
                  required={need.quantity_required}
                  onClick={() => handleCardClick(need)}
                  nameOrganization={need.organization_name}
                  city={need.organization_city}
                />
              ) : (
                <MobileCard
                  key={need.id}
                  imageSrc={require(`../${need.product_picture}`)}
                  title={need.title}
                  description={need.description}
                  date={dayjs(need.date).fromNow()}
                  number={need.quantity_fulfilled}
                  onClick={() => handleCardClick(need)}
                />
              )
            )}
        </div>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
