import { Card, CardContent, CardMedia, Typography, useMediaQuery } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../../style/user/cardNeedUser.scss';

const CardNeedUser = ({ imageSrc, title, description, date, fulfilled, required, onClick, nameOrganization, city,productId }) => {
    
    const theme = createTheme({
        palette: {
            primary: {
                main: "#90C088", 
            },
            secondary: {
                main: "#D9D9D9", 
            },
        },
    });
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const titleStyle = {
        position: 'absolute',
        top: '120px', 
        left: '0px',
        right: '0px',
        padding: '4px 16px', 
        borderRadius: '4px',
        color: 'white',
        fontSize: "20px"
    };

    const fulfilledStyle = {
        position: 'absolute',
        top: '10px', 
        left: '0px',
        right: '0px',
        textAlign: 'right',
        padding: '0px 16px', 
        borderRadius: '4px',
        color: 'white',
        fontWeight: "bold",
        fontSize: "15px"
        
    };

    const footerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        color: "#7D7D7D"
    };


    const maxTitleLength = 30; 
    const maxDescriptionLength = isMobile ? 80 : 100;

    const truncatedTitle = title.length > maxTitleLength ? title.slice(0, maxTitleLength) + "..." : title;

    const truncatedDescription = description.length > maxDescriptionLength
        ? description.slice(0, maxDescriptionLength) + "..."
        : description;

    

    return (
        <Card  className='card-need-user' onClick={onClick}>
            <CardMedia
                component="img"
                image={imageSrc}
                alt="Card Image"
                className='card-image-style'
            />
            <Typography style={titleStyle} variant="caption" className='align-left'>
                {nameOrganization}
            </Typography>
            <Typography style={fulfilledStyle} variant="caption" className='align-left'>
                    {(fulfilled || 0) + " of " + required + " raised"}
            </Typography>
            
            <ThemeProvider theme={theme}>
                <LinearProgress
                    variant="determinate"
                    value={(fulfilled / required) * 100}
                    backgroundColor="secondary"
                    
                />
            </ThemeProvider>
            
            <CardContent sx={{paddingTop: "0px", paddingLeft: "7px", paddingRight: "7px", '&:last-child': { pb: 1.5 }}}>

            <Typography sx={{fontWeight: "bold" , paddingBottom:"10px"}}>{truncatedTitle}</Typography> 
                <Typography sx={{ paddingBottom: "8px", lineHeight: '1.2', height: '2.8em', overflow: 'hidden' }} variant="body1" gutterBottom>
                    {truncatedDescription}
                </Typography>
                <p className='hide-productID' >{productId} </p> 
                <div style={footerStyle}>
                    <Typography variant="caption" className='align-right'>
                        {city}
                    </Typography>
                    <Typography variant="caption" className='align-right'>
                        {date}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
};

export default CardNeedUser;
