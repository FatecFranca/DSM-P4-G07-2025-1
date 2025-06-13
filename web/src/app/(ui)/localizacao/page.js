'use client';

import { useEffect, useState } from "react";
import axios from 'axios';
import { NavigationBar } from "@/components/nav/navigationBar";
import { ExpandableMenu } from "@/components/ui/expandableMenu";
import { animalId } from "@/utils/api";
import { useMap } from "@/app/context/MapContext";
import dynamic from "next/dynamic";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MapComponent = dynamic(() => import("@/components/ui/mapComponent"), {
  ssr: false,
});

export default function Page() {
  const { location, loading } = useMap();
  const [address, setAddress] = useState(null);
  const [addressError, setAddressError] = useState('');

  useEffect(() => {
    if (!location) return;

    const fetchAddress = async () => {
      setAddress(null);
      setAddressError('');
      try {
        const response = await axios.get('/api/getAddress', {
          params: {
            lat: location.lat,
            lng: location.lng,
          },
        });
        setAddress(response.data.address);
      } catch (error) {
        console.error("Erro ao buscar endereço:", error.response?.data || error.message);
        setAddressError("Não foi possível obter o endereço.");
      }
    };

    fetchAddress();
  }, [location]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {!loading && (address || addressError) && (
        <div className="absolute top-4 left-4 right-4 md:left-auto md:right-4 z-50 flex flex-col items-center gap-2 max-w-sm mx-auto p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faLocationDot} className="text-[var(--color-orange)] text-xl"/>
            <h2 className="text-lg font-bold" style={{ color: 'var(--color-orange)' }}>
              UNO ESTÁ EM:
            </h2>
          </div>
          {address && (
            <p className="text-sm text-gray-800 font-medium text-center">
              {address}
            </p>
          )}
          {addressError && (
            <p className="text-sm text-red-600 font-bold text-center">
              {addressError}
            </p>
          )}
        </div>
      )}

      <div className="absolute inset-0 z-0">
        {!loading && location ? (
          <MapComponent />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <p className="text-gray-600 text-center font-bold">Carregando mapa e localização...</p>
          </div>
        )}
      </div>

      <ExpandableMenu
        animalId={animalId}
        backgroundColor="var(--color-white-matte)"
        className="fixed bottom-16 left-0 right-0 z-50"
        showGraph={true}
        graphType="linhas"
      />
      <NavigationBar
        activePage="localizacao"
        activeColor="#09A709"
        className="fixed bottom-0 left-0 right-0 z-50"
      />
    </div>
  );
}