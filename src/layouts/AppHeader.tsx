import { useEffect, useRef } from 'react';
import { useSidebar } from '../context/SidebarContext';
import { ArrowLeftToLine, ArrowRightFromLine, ChevronDown, LogOut, User } from 'lucide-react';
import type { MenuItem } from 'primereact/menuitem';
import { TieredMenu } from 'primereact/tieredmenu';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '@utils/constant/app-route.constants.ts';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store.ts';

const AppHeader: React.FC = () => {
  const { pageTitle } = useSelector((state: RootState) => state.metadata);
  const { toggleSidebar, toggleMobileSidebar, isExpanded } = useSidebar();
  const menu = useRef<TieredMenu | null>(null);
  const navigate = useNavigate();
  const menuItems: MenuItem[] = [
    {
      label: 'Profile',
      icon: <User />,
      command: () => {
      },
    },
    {
      label: 'Logout',
      icon: <LogOut />,
      command: () => onLogoutUser(),
    },
  ];

  const onLogoutUser = () => {
    navigate(LOGIN_ROUTE);
  };

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <header
        className="sticky top-0 flex w-full bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 lg:border-b z-50">
        <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
          <div
            className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
            <button
              className="items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-99999 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-11 lg:w-11 lg:border"
              onClick={handleToggle}
              aria-label="Toggle Sidebar"
            >
              {isExpanded ? (
                <ArrowLeftToLine />
              ) : (
                <ArrowRightFromLine />
              )}
            </button>
            <h2 className={'text-2xl font-medium'}>{pageTitle}</h2>
          </div>
          <button className="flex items-center gap-3" onClick={(e) => menu.current?.toggle(e)}>
            <div
              className="flex h-12 w-12 min-w-[3rem] min-h-[3rem] items-center justify-center rounded-full bg-gray-100 text-gray-600 ring-1 ring-gray-200">
              <User className="h-6 w-6" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">Umar Farooq</span>
              <span className="text-xs text-gray-500 whitespace-nowrap">Van Representative</span>
            </div>
            <ChevronDown />
          </button>
        </div>
      </header>
      <TieredMenu model={menuItems} popup ref={menu} />
    </>
  );
};

export default AppHeader;