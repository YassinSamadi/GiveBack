import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Grid } from '@mui/material';
import ReceivedTable from '../../components/organization/ReceivedTable';
import HistoryCard from '../../components/HistoryCard';

export const DonationsInfo = () => {
    const [totalReceived, setTotalReceived] = useState(0);
    const [topDonator, setTopDonator] = useState("");


    useEffect(() => {
            axios
                .get(`/donations/getTotalDonationsReceivedByOrg`)
                .then((response) => {
                    setTotalReceived(response.data.total_donations);
                })
                .catch((error) => {
                    console.error('Error fetching total donations:', error);
                });

            axios
                .get(`/donations/getTopDonatorToOrg`)
                .then((response) => {
                    setTopDonator(response.data.user_name);
                })
                .catch((error) => {
                    console.error('Error fetching top donator:', error);
                });
    }, []);
    return (
        <div className="centered-container"> 
            <Grid className='green-background' container spacing={2}>
                <Grid item xs={12} md={6}>
                <HistoryCard icon={EmojiEventsIcon} number={totalReceived} description={'Total Received'} />
                </Grid>
                <Grid item xs={12} md={6}>
                <HistoryCard icon={EmojiEventsIcon} number={topDonator} description={'Top donator'} />
                </Grid>
            </Grid>
            
            <h1>History</h1>
            <ReceivedTable/>
        </div>
    );
};

export default DonationsInfo;
