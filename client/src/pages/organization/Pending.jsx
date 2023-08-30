import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import '../../style/organization/pending.scss';
import PendingCard from '../../components/organization/PendingCard';
import DeleteDonation from '../../components/organization/DeleteDonation';

export const Pending = () => {
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(3),
        width: 'auto',
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        border: '1px solid lightgrey', // Add border styling
        borderRadius: theme.shape.borderRadius *4,
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: 640,
          },
        },
        '& .Mui-focused': {
          borderColor: 'lightgrey',
        },
      }));

      const [donations, setDonations] = useState([]);
      const [deletingDonation, setDeletingDonation] = useState(null);


      const handleClose = () => {
        setDeletingDonation(null);
      };

      const handleDelete = (donation) => {
        setDeletingDonation(donation);
      };


      useEffect(() => {
              axios
                  .get(`/donations/getAllDonationsNoConfirmation`)
                  .then((response) => {
                      setDonations(response.data);
                  })
                  .catch((error) => {
                      console.error('Error fetching total donations:', error);
                  });

              // axios
              //     .get(`/donations/getTopDonatorToOrg`)
              //     .then((response) => {
              //         setTopDonator(response.data.user_name);
              //     })
              //     .catch((error) => {
              //         console.error('Error fetching top donator:', error);
              //     });
      }, []);
      
  return (
    <div>
        <div className='center-div'>
        <Button className='button button-left'>
            Donations
            </Button>
            <Button className='button button-right'>
            Pickups
            </Button>
        </div>
        <DeleteDonation open={!!deletingDonation} handleClose={handleClose} donation={deletingDonation} />
        <div className='center-div'>
            <Search>
                <SearchIconWrapper>
                <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search by name"
                  inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
        </div>
        {donations.length === 0 ? (
          <PendingCard first_name={"No donations available"}/>
        ):( donations.map((donation) => (
          <div className='center-div'>
              <PendingCard  onDelete={() => {handleDelete(donation);}} donation_id={donation.id}  first_name={donation.first_name} last_name={donation.last_name} donation_title={donation.need_title} need_id={donation.need_id} amount={donation.quantity_donated}/>
    
          </div>
        )))}
    </div>
  );
};

export default Pending;
