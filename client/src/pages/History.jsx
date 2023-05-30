import React from 'react';
import HistoryCard from '../components/HistoryCard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Grid } from '@mui/material';
import HistoryTable from '../components/HistoryTable';
import '../style/History.scss'; // Import CSS file for styling


export const History = () => {
        return (
        <div className="centered-container"> 
        <Grid sx={{backgroundColor: "#90C088"}} container spacing={2}>
            <Grid item xs={12} md={6}>
            <HistoryCard icon={EmojiEventsIcon} number={50} description={'Total Donated'} />
            </Grid>
            <Grid item xs={12} md={6}>
            <HistoryCard icon={EmojiEventsIcon} number={50} description={'Total Donated'} />
            </Grid>
            <Grid item xs={12} md={6}>
            <HistoryCard icon={EmojiEventsIcon} number={50} description={'Total Donated'} />
            </Grid>
            <Grid item xs={12} md={6}>
            <HistoryCard icon={EmojiEventsIcon} number={50} description={'Total Donated'} />
            </Grid>
        </Grid>
        
        <h1>History</h1>
        <HistoryTable />
        </div>
    );
};

export default History;
