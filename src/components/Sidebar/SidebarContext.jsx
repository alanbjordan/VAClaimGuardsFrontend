// SidebarContext.js
import React, { createContext, useContext } from 'react';
import { useSidebarState } from '../../hooks/useSidebarState';

const SidebarContext = createContext(undefined);

export const SidebarProvider = ({ children }) => {
  const sidebarState = useSidebarState(); // { isCollapsed, toggleSidebar }

  return (
    <SidebarContext.Provider value={sidebarState}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
