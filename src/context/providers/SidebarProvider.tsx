import React, { useMemo, useState } from 'react';
import { SidebarContext } from '@context/SidebarContext.tsx';

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const value = useMemo(() => ({ isExpanded, setIsExpanded }), [isExpanded]);

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};