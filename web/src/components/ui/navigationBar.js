import { NavItem } from "@/components/nav/nav-item";
import { faHome, faMapMarkerAlt, faHeart, faCog, faHouseChimney, faHeartPulse } from "@fortawesome/free-solid-svg-icons";

export function NavigationBar({ activePage, activeColor = "var(--color-orange)" }) {
  return (
    <footer
      className="absolute bottom-0 left-0 right-0 h-20 flex justify-center gap-4 items-center lg:space-x-6"
      style={{ backgroundColor: "var(--color-gray-light" }}
    >
      <NavItem href="/home" icon={faHouseChimney} label="Tela inicial" active={activePage === "home"} activeColor={activeColor} />
      <NavItem href="/localizacao" icon={faMapMarkerAlt} label="Localização" active={activePage === "localizacao"} activeColor={activeColor} />
      <NavItem href="/saude" icon={faHeartPulse} label="Saúde" active={activePage === "saude"} activeColor={activeColor} />
      <NavItem href="/configuracoes" icon={faCog} label="Configurações" active={activePage === "configuracoes"} activeColor={activeColor} />
    </footer>
  );
}
