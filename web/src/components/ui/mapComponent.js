'use client';

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useMap } from '@/app/context/MapContext';

const containerStyle = {
  width: '100%',
  height: '100%',
};

export default function MapComponent() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const { location, loading } = useMap(); 

  if (loadError) {
    return <div>Erro ao carregar o mapa</div>;
  }

  if (!isLoaded || loading || !location) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <p>Carregando mapa...</p>
      </div>
    );
  }

  // Definindo o ícone personalizado APÓS verificar que a API está carregada
  const customIcon = {
    url: '/uno-mapa.svg',
    scaledSize: new window.google.maps.Size(40, 40),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(20, 40)
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location}
      zoom={15}
      options={{ disableDefaultUI: true }}
    >
      <Marker 
        position={location}
        icon={customIcon}
      />
    </GoogleMap>
  );
}