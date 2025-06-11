"use client";

import { createContext, useContext, useState } from "react";

const MenuContext = createContext(null);

export function MenuProvider({ children }) {
  const [expanded, setExpanded] = useState(false);
  const [animalInfo, setAnimalInfo] = useState(null);
  const [batimento, setBatimento] = useState(null);

  return (
    <MenuContext.Provider
      value={{ expanded, setExpanded, animalInfo, setAnimalInfo, batimento, setBatimento }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
