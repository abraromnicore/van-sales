import { useSidebar } from '../context/SidebarContext';
import { Outlet } from 'react-router';
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';
import { SidebarProvider } from '@context/SidebarProvider';

const LayoutContent: React.FC = () => {
  const { isExpanded, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out min-h-screen grid grid-rows-[auto_1fr] ${
          isExpanded ? 'lg:ml-[290px]' : 'lg:ml-[0px]'
        } ${isMobileOpen ? 'ml-0' : ''}`}
      >
        {/*<div
        className={`flex-1 transition-all duration-300 ease-in-out min-h-screen grid grid-rows-[auto_1fr] ${
          isExpanded ? 'lg:ml-[290px]' : 'lg:ml-[0px]'
        } ${isMobileOpen ? 'ml-0' : ''}`}
      >*/}
        <AppHeader />
        <div className={'p-6 grid grid-cols-1 grid-rows-1'}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export const AppLayout = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};
