"use client"

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

export default function MapComponent({ location }) {
  return (
    <LoadScript googleMapsApiKey={"AIzaSyCwi5aDIM0TBLzxAPCO_4xbQBtqlGUedRg"}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={15}
        options={{ disableDefaultUI: true }}
      >
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
}
