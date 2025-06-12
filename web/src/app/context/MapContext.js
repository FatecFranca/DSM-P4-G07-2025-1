'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getLatestLocalizacao, animalId } from '@/utils/api';

const MapContext = createContext();

export function MapProvider({ children }) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const data = await getLatestLocalizacao(animalId);
        setLocation({ lat: data.latitude, lng: data.longitude });
      } catch (error) {
        console.error("Erro ao buscar a localização do animal:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  return (
    <MapContext.Provider value={{ location, loading }}>
      {children}
    </MapContext.Provider>
  );
}

export function useMap() {
  return useContext(MapContext);
}
