import React, { useEffect, useState } from 'react';
import HistoryCard from '../components/HistoryCard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Grid } from '@mui/material';
import HistoryTable from '../components/user/HistoryTable';
import '../style/History.scss'; // Import CSS file for styling
import axios from 'axios'; 
import { Typography } from '@mui/material';


export const History = () => {
    const [totalDonations, setTotalDonations] = useState(0);
    const [highestDonation, setHighestDonation] = useState(0);

    useEffect(() => {
        axios.get(`/donations/getTotalDonations`)
            .then((response) => {
                setTotalDonations(response.data.total);
            })
            .catch((error) => {
                console.error('Error fetching total donations:', error);
            });

        axios.get(`/donations/getHighestDonation`)
            .then((response) => {
                setHighestDonation(response.data.highest);
            })
            .catch((error) => {
                console.error('Error fetching highest donation:', error);
            });
}, []);

    return (
        <div className="centered-container"> 
            <Grid sx={{backgroundColor: "#90C088"}} container spacing={2}>
                <Grid item xs={12} md={6}>
                <HistoryCard icon={EmojiEventsIcon} number={totalDonations} description={'Total Donated'} />
                </Grid>
                <Grid item xs={12} md={6}>
                <HistoryCard icon={EmojiEventsIcon} number={highestDonation} description={'Highest donation'} />
                </Grid>
            </Grid>
            
            
            <Typography variant="h4" style={{ textAlign: 'center', marginTop: '20px', paddingBottom:"30px" }}>
            <span style={{ display: 'inline-block', borderBottom: '4px solid #90C088', padding: '0 10px' }}>
            History
            </span>
        </Typography>
            <HistoryTable />
        </div>
    );
};

export default History;
