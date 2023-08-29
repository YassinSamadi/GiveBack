import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

function ListItemLink({ disabled = false, icon, primary, to, closeDrawer  }) {
  const location = useLocation();


  const iconStyles = {
    color: '#90C088',
  };
  const activeBackgroundColor = '#F0F0F0';
  const inactiveBackgroundColor = 'transparent';


  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <Link to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  const handleClick = () => {
    closeDrawer(); 
  };

  return (
    <ListItem
      button
      selected={to === location.pathname}
      disabled={disabled ?? false}
      component={renderLink}
      onClick={handleClick}
      style={{
        backgroundColor: to === location.pathname ? activeBackgroundColor : inactiveBackgroundColor,
      }}
    >
      {icon ? <ListItemIcon style={iconStyles}>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} className='green-color'/>
    </ListItem>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

ListItemLink.defaultProps = {
  disabled: false,
};

export default ListItemLink;
