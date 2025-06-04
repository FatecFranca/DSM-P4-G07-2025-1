"use client"

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useState, useEffect } from 'react';

const containerStyle = {
  width: '100%',
  height: '100%',
};

export default function MapComponent({ location }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      setIsLoaded(true);
    }
  }, []);

  if (!isLoaded) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <p>Carregando mapa...</p>
      </div>
    );
  }

  return (
    <LoadScript 
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      loadingElement={<div className="w-full h-full bg-gray-200" />}
    >
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