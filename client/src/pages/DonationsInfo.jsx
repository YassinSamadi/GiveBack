import React, { useEffect, useState } from 'react';
import HistoryCard from '../components/HistoryCard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Grid } from '@mui/material';
import ReceivedTable from '../components/ReceivedTable';
import axios from 'axios';
import '../style/History.scss';


export const DonationsInfo = () => {
    const [totalReceived, setTotalReceived] = useState(0);
    const [topDonator, setTopDonator] = useState("");

    const organization = JSON.parse(localStorage.getItem('organization'));
    const orgId = organization ? organization.id : null;

    useEffect(() => {
        if(orgId) {
            axios
                .get(`/donations/getTotalDonationsReceivedByOrg?org_id=${orgId}`)
                .then((response) => {
                    setTotalReceived(response.data.total_donations);
                })
                .catch((error) => {
                    console.error('Error fetching total donations:', error);
                });

            axios
                .get(`/donations/getTopDonatorToOrg?org_id=${orgId}`)
                .then((response) => {
                    setTopDonator(response.data.user_name);
                })
                .catch((error) => {
                    console.error('Error fetching top donator:', error);
                });
        } else {
            console.error('No organization found in local storage.');
        }
    }, [orgId]);
    console.log(topDonator);
    return (
        <div className="centered-container"> 
            <Grid sx={{backgroundColor: "#90C088"}} container spacing={2}>
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
