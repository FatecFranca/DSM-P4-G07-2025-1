import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function NavItem({ href, icon, label, active = false, activeColor = "var(--color-orange)" }) {
  const color = active ? activeColor : "var(--color-black)";

  return (
    <Link href={href} className="flex flex-col items-center">
      <FontAwesomeIcon
        icon={icon}
        className="mb-1"
        style={{ fontSize: "28px", color }}
      />
      <span
        className="font-semibold text-sm lg:text-base"
        style={{ color }}
      >
        {label}
      </span>
    </Link>
  );
}
