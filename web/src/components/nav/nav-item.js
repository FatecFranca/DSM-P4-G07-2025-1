import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function NavItem({ href, icon, label, active = false, activeColor = "var(--color-orange)" }) {
  const color = active ? activeColor : "var(--color-black)";

  return (
    <Link href={href} className="flex flex-col items-center" style={{ color }}>
      <FontAwesomeIcon
        icon={icon}
        className="mb-1"
        style={{ fontSize: "28px" }} 
      />
      <span className="font-semibold text-sm lg:text-base">{label}</span>
    </Link>
  );
}
