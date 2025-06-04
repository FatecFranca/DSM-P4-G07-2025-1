"use client";

import { useEffect, useState } from "react";
import { NavigationBar } from "@/components/ui/navigationBar";
import { ExpandableMenu } from "@/components/ui/expandableMenu";
import { getAnimalInfo, animalId, getLatestLocalizacao } from "@/utils/api";
import dynamic from "next/dynamic";
import { LoadScript } from "@react-google-maps/api";

const MapWithNoSSR = dynamic(() => import("@/components/ui/mapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
      Carregando mapa...
    </div>
  ),
});

export default function Layout({ children, activePage = "home", activeColor = "var(--color-orange)" }) {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localizacao = await getLatestLocalizacao(animalId);
        setLocation({
          lat: localizacao.latitude,
          lng: localizacao.longitude,
        });
      } catch (error) {
        console.error("Erro ao buscar a localização do animal:", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div className="relative h-screen w-full overflow-hidden">
        {/* Mapa de fundo */}
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <MapWithNoSSR location={location || { lat: 0, lng: 0 }} />
        </div>

        {/* Conteúdo principal */}
        <main className="relative z-10">{children}</main>

        {/* Menu expansível */}
        <ExpandableMenu animalId={animalId} backgroundColor="var(--color-white-matte)" />

        {/* Barra inferior */}
        <NavigationBar activePage={activePage} activeColor={activeColor} />
      </div>
    </LoadScript>
  );
}
