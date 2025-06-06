"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Button = ({
  children,
  href,
  onClick,
  variant = "primary",
  size = "medium",
  icon,
  className = "",
  fullWidth = false
}) => {
  // Classes base
  const baseClasses = "rounded-full font-semibold transition-all flex items-center justify-center gap-2";

  // Variantes de cor
  const variants = {
    primary: "bg-[var(--color-orange)] text-white hover:bg-[var(--color-orange-hover)]",
    secondary: "border-2 border-[var(--color-orange)] text-[var(--color-orange)] hover:bg-[var(--color-orange-hover)]",
    text: "text-[var(--color-orange)] hover:text-[var(--color-orange-hover)] hover:underline"
  };


  // Tamanhos
  const sizes = {
    small: "px-4 py-1 text-sm",
    medium: "px-6 py-2 text-base",
    large: "px-8 py-3 text-lg"
  };

  // Classes finais
  const widthClass = fullWidth ? "w-full" : "w-auto";
  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;

  // Renderização condicional
  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {icon && <FontAwesomeIcon icon={icon} />}
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {icon && <FontAwesomeIcon icon={icon} />}
      {children}
    </button>
  );
};