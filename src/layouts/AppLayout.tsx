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
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded ? 'lg:ml-[290px]' : 'lg:ml-[0px]'
        } ${isMobileOpen ? 'ml-0' : ''}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-0">
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
