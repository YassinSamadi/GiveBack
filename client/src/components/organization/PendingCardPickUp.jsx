import { Card, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../../style/organization/pendingCard.scss';
import axios from 'axios';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';

const PendingCardPickUp = ({ transaction_id, first_name, last_name, transaction_name, quantity, onDelete }) => {

    const handleClickConfirm = async () => {
        try {
            await axios.put(`/transaction/confirmPickup?id=${transaction_id}`);
            window.location.reload();
        } catch (error) {
            
        }
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.up('md'));

    const closeClickStyle = {
        cursor: 'pointer'
    };
    
    return (
        <div>
            <Card sx={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', alignItems: 'center', padding: '10px', width: isMobile ? "800px" : "350px" }}>
                {!isMobile && (
                    <Box sx={{ marginBottom: '10px', width: '100%', display: 'flex', justifyContent: 'right', ...closeClickStyle }}>
                        <CloseIcon onClick={onDelete} sx={{ fontSize: 45, color: '#90C088' }} />
                    </Box>
                )}
                <Box sx={{ marginBottom: '10px', width: '100%', textAlign: isMobile ? 'left' : 'center' }}>
                    <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">Name</Typography>
                    <Typography>{first_name} {last_name}</Typography>
                </Box>
                <Box sx={{ marginBottom: '10px', width: '100%', textAlign: isMobile ? 'left' : 'center' }}>
                    <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">Product Name</Typography>
                    <Typography>{transaction_name}</Typography>
                </Box>
                <Box sx={{ marginBottom: '10px', width: '100%', textAlign: isMobile ? 'left' : 'center' }}>
                    <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">Transaction ID</Typography>
                    <Typography>{transaction_id}</Typography>
                </Box>
                <Box sx={{ marginBottom: '10px', width: '100%', textAlign: isMobile ? 'left' : 'center' }}>
                    <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">Quantity</Typography>
                    <Typography>{quantity}</Typography>
                </Box>
                <Box sx={{ marginBottom: '10px', width: '100%', display: 'flex', justifyContent: isMobile ? 'left' : 'center' }}>
                    <Button onClick={handleClickConfirm} className='button-confirm'>
                        Confirm
                    </Button>
                </Box>
                {isMobile && (
                    <Box sx={{ marginBottom: '10px', width: '100%', display: 'flex', justifyContent: 'right', ...closeClickStyle }}>
                        <CloseIcon onClick={onDelete} sx={{ fontSize: 45, color: '#90C088' }} />
                    </Box>
                )}
            </Card>
        </div>
    );
};

export default PendingCardPickUp;
