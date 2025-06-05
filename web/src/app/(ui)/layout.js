"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NavigationBar } from "@/components/ui/navigationBar";
import { ExpandableMenu } from "@/components/ui/expandableMenu";
import { getAnimalInfo, animalId, getLatestLocalizacao } from "@/utils/api";
import dynamic from "next/dynamic";

// Mapa dinâmico
const MapComponent = dynamic(() => import("@/components/ui/mapComponent"), {
  ssr: false,
});

export default function Layout({ children, activePage = "home", activeColor = "var(--color-orange)" }) {
  const [location, setLocation] = useState(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/home";

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

    if (isHomePage) {
      fetchData();
    }
  }, [isHomePage]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {isHomePage && (
        <div className="absolute inset-0 z-0">
          {location ? (
            <MapComponent location={location} />
          ) : (
            <p className="text-white text-center pt-10 font-bold">Carregando mapa...</p>
          )}
        </div>
      )}

      {/* Conteúdo principal */}
      <main className={`relative z-10 ${isHomePage ? 'pb-20' : ''}`}>
        {children}
      </main>

      {/* Menu expansível */}
      {isHomePage && (
        <ExpandableMenu animalId={animalId} backgroundColor="var(--color-white-matte)" />
      )}

      {/* Barra inferior fixa */}
      {isHomePage && (
        <NavigationBar activePage={activePage} activeColor={activeColor} />
      )}
    </div>
  );
}
