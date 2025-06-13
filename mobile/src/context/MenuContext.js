import React, { createContext, useState, useContext } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  return (
    <MenuContext.Provider value={{ isMenuExpanded, setIsMenuExpanded }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
