import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import FilterNeeds from '../components/FilterNeeds.jsx';
import FilterOrganizations from '../components/FilterOrganizations.jsx';
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
  const [selectedProductIds, setSelectedProductIds] = useState([]); // Initialize with an empty array
  const [selectedOrganizationIds, setSelectedOrganizationIds] = useState([]); // Initialize with an empty array
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

  const numPages = Math.ceil(sortedNeeds.length / itemsPerPage);
  const displayedNeeds = sortedNeeds
  .filter((need) => selectedProductIds.length === 0 || selectedProductIds.includes(need.product_id))
  .filter((need) => selectedOrganizationIds.length === 0 || selectedOrganizationIds.includes(need.org_id))
  .slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleProductFilterChange = (selectedIds) => {
    console.log('Selected Product IDs:', selectedIds);

    setSelectedProductIds(selectedIds);
  };

  const handleOrganizationFilterChange = (selectedIds) => {
    setSelectedOrganizationIds(selectedIds);

    setSelectedOrganizationIds(selectedIds);
  };
  const handleClearFilters = () => {
    setSelectedProductIds([]); // Clear selected product filters
    setSelectedOrganizationIds([]); // Clear selected organization filters
    // You can also reset other filter states if needed
  };
  return (
    <Grid container spacing={2} style={{ margin: '0 auto', width: '100%' }}>
      <Grid item xs={12} md={3}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <FilterNeeds onProductFilterChange={handleProductFilterChange} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <FilterOrganizations onOrganizationFilterChange={handleOrganizationFilterChange} />
        </div>
      </Grid>

      <Grid item xs={12} md={9} sx={{ paddingRight: '10px' }}>
        <CardDetails open={!!selectedCard} handleClose={handleClose} product={selectedCard} />

        {displayedNeeds.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '50px', width: '100%' }}>
            <h2>No needs to display.</h2>
          </div>
        ) : (
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
                  productId={need.product_id}
                />
              </Grid>
            ))}
          </Grid>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
          <Pagination count={numPages} page={page} onChange={handlePageChange} />
        </div>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
