import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import '../../style/organization/pending.scss';
import PendingCard from '../../components/organization/PendingCard';
import PendingCardPickUp from '../../components/organization/PendingCardPickUp';
import DeleteDonation from '../../components/organization/DeleteDonation';
import DeletePopup from '../../components/organization/DeletePopUp';

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
    borderRadius: theme.shape.borderRadius * 4,
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

  const [showDonations, setShowDonations] = useState(true);
  const [donations, setDonations] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [deletingDonation, setDeletingDonation] = useState(null);
  const [deletingTransaction, setDeletingTransaction] = useState(null);


  const handleClose = () => {
    setDeletingDonation(null);
  };

  const handleClosePickup = () => {
    setDeletingTransaction(null);
  };

  const handleDeleteDonation = (donation) => {
    setDeletingDonation(donation);
  };

  const handleDeleteTransaction = (transaction) => {
    setDeletingTransaction(transaction);
  }

  const handlePickupDelete = () => {
    axios
        .delete(`/transaction/deleteTransaction?id=${deletingTransaction.id}`)
        .then(response => {
          handleClosePickup();
          window.location.reload();
        })
        .catch(err => console.error('Error deleting pickup:', err));
  }
  
  const handleDonationDelete = () => {
    axios
        .delete(`/donations/deleteDonation?id=${donations.id}`)
        .then(response => {
            handleClose();
            window.location.reload();
        })
        .catch(err => console.error('Error deleting need:', err));
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

      axios
      .get(`/transaction/getactivetransactions`)
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching total pickups:', error);
      });
  }, []);

  return (
    <div>
      <div className='center-div'>
        <Button className={showDonations ? 'active-button button button-left' : 'button button-left'} onClick={() => setShowDonations(true)}>
          Donations
        </Button>
        <Button className={!showDonations ? 'active-button button button-right' : 'button button-right'} onClick={() => setShowDonations(false)}>
          Pickups
        </Button>
      </div>
      {showDonations ? (
        <div>
          <DeletePopup title='Donation' content='donation' open={!!deletingDonation} handleClose={handleClose} handleDelete={handleDonationDelete}/>
          
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
            <div className='center-div'>
              <p>No donations available</p>
            </div>
          ) : (donations.map((donation) => (
            <div className='center-div'>
              <PendingCard onDelete={() => { handleDeleteDonation(donation); }} donation_id={donation.id} first_name={donation.first_name} last_name={donation.last_name} donation_title={donation.need_title} need_id={donation.need_id} amount={donation.quantity_donated} />
            </div>
          )))}
        </div>
      ) : (
        <div>
          <DeletePopup title='Pickup' content='pickup' open={!!deletingTransaction} handleClose={handleClosePickup} handleDelete={handlePickupDelete}/>
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
          {transactions.length === 0 ? (
            <div className='center-div'>
              <p>No pickups available</p>
            </div>
          ) : (transactions.map((transaction) => (
            <div className='center-div'>
              <PendingCardPickUp onDelete={() => { handleDeleteTransaction(transaction); }} transaction_id={transaction.id} first_name={transaction.first_name} last_name={transaction.last_name} transaction_name={transaction.name} quantity={transaction.quantity} />
            </div>
          )))}
        </div>
      )}

    </div>
  );
};

export default Pending;
