import React, { useState } from 'react';
import Map, { GeolocateControl, Marker, Popup, NavigationControl } from 'react-map-gl';

const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const CustomMap = () => {

  const [selectedCityIndex, setSelectedCityIndex] = useState(null);
  
  const geolocateControlRef = React.useCallback((ref) => {
    if (ref) {
      // Activate as soon as the control is loaded
      ref.trigger();
    }
  }, []);

  const cities = [
    { longitude: 4.4024643, latitude: 51.2194475, name: 'Antwerp', otherInfo: 'Info 1' },
    { longitude: 4.8424643, latitude: 50.9194475, name: 'Brussels', otherInfo: 'Info 2' },
  ];

  return (
    <Map mapboxAccessToken={TOKEN} mapStyle="mapbox://styles/mapbox/streets-v9">
      <GeolocateControl ref={geolocateControlRef} />
      <NavigationControl />

      {cities.map((city, index) => (
        <React.Fragment key={index}>
          <Marker longitude={city.longitude} latitude={city.latitude} onClick={() => setSelectedCityIndex(index)} />

          {selectedCityIndex === index && (
            <Popup
              latitude={city.latitude}
              longitude={city.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setSelectedCityIndex(null)}
              anchor="top" 
            >
              <div>
                <h2>{city.name}</h2>
                <p>{city.otherInfo}</p>
              </div>
            </Popup>
          )}
        </React.Fragment>
      ))}
    </Map>
  );
};

export default CustomMap;
