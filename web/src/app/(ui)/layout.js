"use client"

import { useEffect, useState } from "react";
import { NavigationBar } from "@/components/ui/navigationBar";
import { ExpandableMenu } from "@/components/ui/expandableMenu";
import { getAnimalInfo, animalId, getLatestLocalizacao } from "@/utils/api";
import dynamic from "next/dynamic";

// Importa o mapa de forma dinâmica para evitar SSR
const MapComponent = dynamic(() => import("@/components/ui/mapComponent"), {
  ssr: false,
});

export default function Layout({ children, activePage = "home", activeColor = "var(--color-orange)" }) {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localizacao = await getLatestLocalizacao(animalId);
        setLocation({
          lat: localizacao.latitude,
          lng: localizacao.longitude
        });
      } catch (error) {
        console.error("Erro ao buscar a localização do animal:", error);
      }
    };


    fetchData();
  }, []);

  if (location == null) {
    return "Carregando"
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Mapa de fundo */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        {location ? (
          <MapComponent location={location} />
        ) : (
          <p className="text-white text-center pt-10 font-bold">Carregando mapa...</p>
        )}
      </div>

      {/* Conteúdo principal */}
      <main className="relative z-10">{children}</main>

      {/* Menu expansível */}
      <ExpandableMenu animalId={animalId} backgroundColor="var(--color-white-matte)" />

      {/* Barra inferior */}
      <NavigationBar activePage={activePage} activeColor={activeColor} />
    </div>
  );
}
