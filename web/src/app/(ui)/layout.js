"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NavigationBar } from "@/components/nav/navigationBar";
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

  // Impede scroll apenas na página inicial
  useEffect(() => {
    if (isHomePage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Resetar quando sair da rota
    };
  }, [isHomePage]);

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

      <main className={`relative z-10 ${isHomePage ? "pb-20" : ""}`}>
        {children}
      </main>

      {isHomePage && (
        <>
          <ExpandableMenu
            animalId={animalId}
            backgroundColor="var(--color-white-matte)"
            className="fixed bottom-16 left-0 right-0 z-50"
            showGraph={true}
            graphType="linhas"
          />
          <NavigationBar activePage={activePage} activeColor={activeColor} />
        </>
      )}
    </div>
  );
}
