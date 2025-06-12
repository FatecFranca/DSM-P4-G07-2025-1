"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useMap } from "@/app/context/MapContext";
import { NavigationBar } from "@/components/nav/navigationBar";
import { ExpandableMenu } from "@/components/ui/expandableMenu";
import { animalId } from "@/utils/api";

const MapComponent = dynamic(() => import("@/components/ui/mapComponent"), {
  ssr: false,
});

export default function Layout({ children }) {
  const pathname = usePathname();
  const activePage = pathname?.split("/")[1] || "home";
  const activeColor = activePage === "home" ? "var(--color-orange)" : "#09A709"
  const isHomePage = pathname === "/home" || pathname === "/localizacao";

  const { location, loading } = useMap();

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {isHomePage && (
        <div className="absolute inset-0 z-0">
          {!loading && location ? (
            <MapComponent />
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
