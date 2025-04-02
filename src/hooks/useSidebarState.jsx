import { useState, useEffect } from 'react';

const STORAGE_KEY = 'sidebar_collapsed';

export const useSidebarState = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const toggleSidebar = () => setIsCollapsed(prev => !prev);

  return {
    isCollapsed,
    toggleSidebar
  };
};
