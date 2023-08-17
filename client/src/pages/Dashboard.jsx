import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import FilterNeeds from '../components/FilterNeeds.jsx';
import FilterOrganizations from '../components/FilterOrganizations.jsx';
import FilterLocation from '../components/FilterLocation.jsx';
import CardDetails from '../components/CardDetails.jsx';
import CardNeedUser from '../components/CardNeedUser.jsx';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Pagination } from '@mui/material';

dayjs.extend(relativeTime);

export const Dashboard = () => {
  const [needs, setNeeds] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    axios
      .get('/needs/getspecificneed') 
      .then((response) => {
        setNeeds(response.data);
        console.log(response.data);
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

  const sortedNeeds = [...needs].sort((a, b) => new Date(b.date) - new Date(a.date));

  const numPages = Math.ceil(needs.length / itemsPerPage);
  const displayedNeeds = sortedNeeds.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Grid container spacing={2} style={{ margin: '0 auto', width: '100%' }}>
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

      <Grid item xs={12} md={9} sx={{paddingRight:"10px"}}>
      {/* <Typography variant="h4" style={{ textAlign: 'center', marginTop: '20px' }}>
        <span style={{ display: 'inline-block', borderBottom: '4px solid #90C088', padding: '0 10px' }}>
          Results
        </span>
      </Typography> */}


        <CardDetails open={!!selectedCard} handleClose={handleClose} product={selectedCard} />

        <Grid container spacing={2}> 
          {displayedNeeds.map((need) => (
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={need.id}>
                <CardNeedUser
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
              </Grid>
            ))}
        </Grid> 
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Pagination count={numPages} page={page} onChange={handlePageChange} />
        </div>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
