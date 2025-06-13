// app/layout.js
import { ExpandableMenu } from "@/components/ui/expandableMenu";
import "./globals.css";
import { Poppins } from "next/font/google";
import { animalId } from "@/utils/api";
import { MenuProvider } from "./context/MenuContext";
import { GraficoLinhasProvider } from "./context/GraficoLinhasContext";
import { MapProvider } from "./context/MapContext";
import dynamic from "next/dynamic";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "PetDex",
  icons: {
    icon: "/pata-dex.svg", 
  },
};



export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={poppins.variable}>
      <body className="font-poppins bg-white">
        <MapProvider>
          <GraficoLinhasProvider>
            <MenuProvider>
              {children}
              <mapComponent>

              </mapComponent>
              <ExpandableMenu
                animalId={animalId}
                backgroundColor="var(--color-white-matte)"
                className="fixed bottom-16 left-0 right-0 z-50"
                showGraph={true}
                graphType="linhas"
              />

            </MenuProvider>
          </GraficoLinhasProvider>
        </MapProvider>
      </body>
    </html>
  );
}
