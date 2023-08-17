import React from 'react';
import ReceivedTable from '../components/ReceivedTable';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

import '../style/Pending.scss';
import PendingCard from '../components/PendingCard';

export const Pending = () => {
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
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
          [theme.breakpoints.down('sm')]: {
            width: 300,
          },
        },
        '& .Mui-focused': {
          borderColor: 'lightgrey',
        },
      }));
      
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

        <div className='center-div'>
            <Search>
                <SearchIconWrapper>
                <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                placeholder=""
                inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
        </div>

        <div className='center-div'>
            <PendingCard first_name={"Yassin"} last_name={"Samadi"} donation_title={"Water is needed"} donation_id={"47"} />
        </div>
    </div>
  );
};

export default Pending;
