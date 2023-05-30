import React from 'react';
import HistoryCard from '../components/HistoryCard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Grid } from '@mui/material';
import ReceivedTable from '../components/ReceivedTable';
import '../style/History.scss'; // Import CSS file for styling


export const DonationsInfo = () => {
    return (
        <div className="centered-container"> 
            <Grid sx={{backgroundColor: "#90C088"}} container spacing={2}>
                <Grid item xs={12} md={6}>
                <HistoryCard icon={EmojiEventsIcon} number={53} description={'Total Received'} />
                </Grid>
                <Grid item xs={12} md={6}>
                <HistoryCard icon={EmojiEventsIcon} number={"Yassin"} description={'Top donator'} />
                </Grid>
            </Grid>
            
            <h1>History</h1>
            <ReceivedTable/>
        </div>
    );
};

export default DonationsInfo;
