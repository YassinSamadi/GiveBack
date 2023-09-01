import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import '../../style/organization/card.scss';

const MuiCard = ({
  imageSrc,
  title,
  description,
  date,
  fulfilled,
  required,
  onClick,
  showActions,
  onEdit,
  onDelete,
}) => {
  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const cardStyle = {
    backgroundColor: 'white',
    display: 'flex',
    maxWidth: isMobile ? 380 : 650,
    margin: '0 auto',
    marginTop: 3,
    maxHeight: 150,
  };

  const typographyStyle = {
    paddingBottom: '8px',
    lineHeight: '1.2',
    height: isMobile ? '4em' : '3em',
    overflow: 'hidden',
  };

  const maxTitleLength = isMobile ? 15 : 30;
  const maxDescriptionLength = isMobile ? 60 : 85;

  const truncatedTitle =
    title.length > maxTitleLength ? title.substring(0, maxTitleLength) + '...' : title;
  const truncatedDescription =
    description.length > maxDescriptionLength
      ? description.substring(0, maxDescriptionLength) + '...'
      : description;

  return (
    <Card onClick={onClick} sx={cardStyle}>
      <CardMedia
        component="img"
        sx={{ width: isMobile ? 80 : 150, minWidth: 70, objectFit: 'cover' }}
        image={imageSrc}
        alt="Card Image"
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          {truncatedTitle}
        </Typography>
        <Typography sx={typographyStyle} variant="body1" gutterBottom>
          {truncatedDescription}
        </Typography>
        <div className="footer-style">
          <Typography variant="caption" sx={{ textAlign: 'left' }}>
            {fulfilled} / {required}
          </Typography>
          <Typography
            variant="caption"
            sx={{ textAlign: 'right', marginRight: '-80px' }}
          >
            {dayjs(date).format('DD/MM/YYYY')}
          </Typography>
        </div>
      </CardContent>
      {showActions && (
        <div>
          <IconButton onClick={onEdit}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </div>
      )}
    </Card>
  );
};

export default MuiCard;
