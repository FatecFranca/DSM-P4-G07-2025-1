"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function MapComponent({ location }) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) {
    return <div>Erro ao carregar o mapa</div>;
  }

  if (!isLoaded || !location) {
    return <div className="w-full h-full bg-gray-200 flex items-center justify-center">Carregando mapa...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location}
      zoom={15}
      options={{ disableDefaultUI: true }}
    >
      <Marker position={location} />
    </GoogleMap>
  );
}
