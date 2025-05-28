import { NavigationBar } from "@/components/ui/navigationBar";
import { ExpandableMenu } from "@/components/ui/expandableMenu";

export default function Layout({ children, activePage = "home", activeColor = "var(--color-orange)" }) {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Mapa de fundo */}
      <div 
        className="absolute inset-0 bg-[var(--color-gray-medium)]"
        style={{ zIndex: 0 }}
      >
        <p className="text-center pt-10 text-white font-bold">Mapa</p>
      </div>

      {/* Conteúdo principal */}
      <main className="relative z-10">{children}</main>

      {/* Menu expansível */}
      <ExpandableMenu />

      {/* Barra inferior */}
      <NavigationBar activePage={activePage} activeColor={activeColor} />
    </div>
  );
}