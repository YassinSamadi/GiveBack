

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map, { GeolocateControl, Marker, Popup, NavigationControl } from 'react-map-gl';

const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const CustomMap = () => {
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(null);
  const [locations, setLocations] = useState([]);
  

  const geolocateControlRef = React.useCallback((ref) => {
    if (ref) {
      // Activate as soon as the control is loaded
      ref.trigger();
    }
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('/address/addresseswithorganizations');
        setLocations(response.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchLocations();
  }, []);

  return (
    <Map mapboxAccessToken={TOKEN} mapStyle="mapbox://styles/mapbox/streets-v9">
      <GeolocateControl ref={geolocateControlRef} />
      <NavigationControl />

      {locations.map((location, index) => (
        <React.Fragment key={index}>
          <Marker 
            longitude={location.longitude} 
            latitude={location.latitude} 
            onClick={() => setSelectedLocationIndex(index)} 
          />

          {selectedLocationIndex === index && (
            <Popup
              latitude={location.latitude}
              longitude={location.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setSelectedLocationIndex(null)}
              anchor="top" 
            >
              <div>
                <h2>{location.organizationName}</h2>
                <p>{location.address}</p>
              </div>
            </Popup>
          )}
        </React.Fragment>
      ))}
    </Map>
  );
};

export default CustomMap;

