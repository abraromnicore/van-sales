import { useSidebar } from '../context/SidebarContext';
import { Outlet } from 'react-router';
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';
import React from 'react';
import { SidebarProvider } from '@context/providers/SidebarProvider.tsx';

const LayoutContent: React.FC = () => {
  const { isExpanded } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out min-h-screen grid grid-rows-[auto_1fr] ${
          isExpanded ? 'lg:ml-[290px]' : 'lg:ml-[0px]'
        }`}
      >
        <AppHeader />
        <div className={'py-6 grid grid-rows-[auto,1fr]'}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};