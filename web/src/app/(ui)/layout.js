import { NavigationBar } from "@/components/ui/navigationBar";
import { ExpandableMenu } from "@/components/ui/expandableMenu";

export default function Layout({ children, activePage = "home", activeColor = "var(--color-orange)" }) {
  return (
    <div className="relative h-screen w-full">
      {/* Mapa de fundo */}
      <div
        className="absolute inset-0 bg-gray-300"
        style={{ backgroundColor: "var(--color-gray-medium)" }}
      >
        <p className="text-center pt-10 text-white font-bold">Mapa</p>
      </div>

      {/* Menu expansível */}
      <ExpandableMenu navBarHeight="5rem" />



      {/* Barra inferior */}
      <NavigationBar activePage={activePage} activeColor={activeColor} />

      {/* Conteúdo principal */}
      <main>{children}</main>
    </div>
  );
}
