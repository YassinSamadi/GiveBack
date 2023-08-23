import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map, { GeolocateControl, Marker, Popup, NavigationControl } from 'react-map-gl';
import SwipeableTemporaryDrawer from './DrawerMap';

const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const CustomMap = () => {
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(null);
  const [locations, setLocations] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const geolocateControlRef = React.useCallback((ref) => {
    if (ref) {
      ref.trigger();
    }
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('/address/addresseswithorganizations');
const data = response.data.map(item => ({
  ...item,
  needs: item.needs ? JSON.parse(item.needs) : [] // Parse the needs string if it exists
}));
        setLocations(response.data);
      } catch (err) {
        console.error(err);
      }
    }
  
    fetchLocations();
  }, []);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Map mapboxAccessToken={TOKEN} mapStyle="mapbox://styles/mapbox/streets-v9">
      <GeolocateControl ref={geolocateControlRef} />
      <NavigationControl />

      {locations.map((location, index) => (
  <React.Fragment key={index}>
    <Marker 
      longitude={location.longitude} 
      latitude={location.latitude} 
      onClick={() => {
        setSelectedLocationIndex(index);
        openDrawer(); 
      }} 
    />

    {selectedLocationIndex === index && (
      <div>
        <SwipeableTemporaryDrawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          organizationName={location.organizationName}
          organizationID={location.organizationId}
          organizationLogo={location.organizationLogo}
          organizationAddress={location.street + ', ' + location.number + ', ' + location.postal_code + ', ' + location.city}
        />
      </div>
    )}
  </React.Fragment>
))}
    </Map>
  );
};

export default CustomMap;
