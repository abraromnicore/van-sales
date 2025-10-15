import React, { useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router';
import clsx from 'clsx';
import { ChevronDown, ChevronLeft, ChevronRight, LayoutDashboard, Truck, Users } from 'lucide-react';
import styled from 'styled-components';
import { useSidebar } from '../context/SidebarContext';
import appLogo from '@assets/images/static/transmed-logo.png';
import {
  DASHBOARD_ROUTE,
  LOGS_ROUTE,
  ROLES_ROUTE,
  USERS_ROUTE, VAN_LOG_AUDIT_LOGS_ROUTE,
  VAN_REP_HIERARCHY_ROUTE,
  VAN_REP_LIST_ROUTE,
  VIEW_USER_HIERARCHY_ROUTE,
} from '@utils/constant/app-route.constants.ts';

// ========== TYPES ==========
type SubItem = {
  name: string;
  path: string;
  pro?: boolean;
  new?: boolean;
};

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: SubItem[];
};

// ========== STYLED COMPONENTS ==========
const OpenCloseSidebarBtn = styled.button`
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    display: flex;
    width: 20px;
    height: 24px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #6bc5f1;
    color: #3c3c3c;
    border-radius: 8px 0 0 8px;
    cursor: pointer;

    svg {
        width: 16px;
        height: 16px;
    }
`;

const AppLogoContainer = styled.div`
    width: 100%;
    height: 66px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

// ========== REUSABLE COMPONENTS ==========

const SidebarLink: React.FC<{
  nav: NavItem;
  active: boolean;
  visible: boolean;
}> = ({ nav, active, visible }) => (
  <Link
    to={nav.path ?? '#'}
    className={clsx(
      'flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-sm font-medium transition-all duration-200 group',
      active
        ? 'bg-[#E2F6FE] text-primary'
        : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-[#E2F6FE]',
    )}
  >
    <span
      className={clsx(
        'w-[20px] h-[20px] flex items-center justify-center',
        active ? 'text-primary' : 'text-gray-700 group-hover:text-primary',
      )}
    >
      {nav.icon}
    </span>
    {visible && <span className="truncate">{nav.name}</span>}
  </Link>
);

const AccordionButton: React.FC<{
  nav: NavItem;
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
  visible: boolean;
}> = ({ nav, index, isOpen, onToggle, visible }) => (
  <button
    type="button"
    onClick={() => onToggle(index)}
    className={clsx(
      'flex items-center gap-3 w-full px-3 py-2.5 rounded-[12px] text-sm font-medium transition-all duration-200 group',
      isOpen
        ? 'bg-[#E2F6FE] text-primary rounded-b-[0] border-b-[1px] border-b-[#B6E8FD]'
        : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-[#E2F6FE]',
    )}
  >
    <span
      className={clsx(
        'w-[20px] h-[20px] flex items-center justify-center',
        isOpen ? 'text-primary' : 'text-gray-700 group-hover:text-primary',
      )}
    >
      {nav.icon}
    </span>
    {visible && (
      <>
        <span className="flex-1 text-left truncate">{nav.name}</span>
        <ChevronDown
          className={clsx(
            'ml-auto w-[20px] h-[20px] transition-transform duration-200',
            isOpen && 'rotate-180 text-primary',
          )}
        />
      </>
    )}
  </button>
);

const SidebarSubmenu: React.FC<{
  subItems: SubItem[];
  activeCheck: (path: string) => boolean;
}> = ({ subItems, activeCheck }) => (
  <ul>
    {subItems.map((sub) => (
      <li key={sub.name}>
        <Link
          to={sub.path}
          className={clsx(
            `block px-3 py-2.5 text-sm text-primary font-medium rounded-[12px] transition-colors relative before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0 before:h-[24px] before:w-[4px] before:rounded-r-[4px]`,
            activeCheck(sub.path)
              ? 'bg-[#E2F6FE] before:bg-[#6BC5F1]'
              : 'text-gray-700 hover:text-primary hover:bg-[#E2F6FE] before:bg-transparent hover:before:bg-[#6BC5F1]',
          )}
        >
          {sub.name}
        </Link>
      </li>
    ))}
  </ul>
);

// Sidebar toggle button props type
type SidebarToggleButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = (props) => {
  const { isExpanded, setIsExpanded } = useSidebar();

  return (
    <OpenCloseSidebarBtn
      {...props}
      onClick={() => setIsExpanded(true)}
      type="button"
    >
      {isExpanded ? <ChevronLeft /> : <ChevronRight />}
    </OpenCloseSidebarBtn>
  );
};

// ========== MAIN COMPONENT ==========

const AppSidebar: React.FC = () => {
  const { isExpanded } = useSidebar();
  const location = useLocation();
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);
  const menuOptions: NavItem[] = [
    {
      icon: <LayoutDashboard />,
      name: 'Dashboard',
      path: DASHBOARD_ROUTE,
    },
    {
      icon: <Truck />,
      name: 'Van Representative',
      subItems: [
        { name: 'Van Rep List', path: VAN_REP_LIST_ROUTE },
        // { name: 'Van Assignment Hierarchy', path: VAN_REP_HIERARCHY_ROUTE },
        {name:'Van Load Audit Logs',path:VAN_LOG_AUDIT_LOGS_ROUTE}
      ],
    },
    {
      icon: <Users />,
      name: 'Users Management',
      subItems: [
        { name: 'Roles', path: ROLES_ROUTE },
        { name: 'Users', path: USERS_ROUTE },
        { name: 'Users Logs', path: LOGS_ROUTE },
        {
          name: 'User Hierarchy',
          path: VIEW_USER_HIERARCHY_ROUTE.replace('{id}', '234'),
        },
      ],
    },
  ];

  React.useEffect(() => {
    const matchedIndex = menuOptions.findIndex((nav) =>
      nav.subItems?.some((s) => location.pathname.startsWith(s.path))
    );
    setOpenSubmenuIndex(matchedIndex >= 0 ? matchedIndex : null);
  }, [location.pathname]);

  const isActive = useCallback(
    (path: string): boolean => location.pathname.startsWith(path),
    [location.pathname],
  );

  const handleSubmenuToggle = (index: number): void => {
    setOpenSubmenuIndex((prev) => (prev === index ? null : index));
  };

  const visible: boolean = isExpanded;

  return (
    <aside
      className={clsx(
        'shadow-[2px_0_9px_0_rgba(0,0,0,0.05)] fixed top-0 left-0 h-screen bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 z-50 transition-all duration-300 ease-in-out',
        visible ? 'w-72' : 'w-0',
        'lg:translate-x-0',
      )}
    >
      {/* ✅ Logo */}
      <div className={clsx('relative flex justify-center transition-all')}>
        {/*<SidebarToggleButton />*/}
        <Link to="/">
          <AppLogoContainer>
            <img
              className="object-contain"
              src={appLogo}
              alt="Logo"
              width={146}
              height={44}
            />
          </AppLogoContainer>
        </Link>
      </div>

      {/* ✅ Navigation */}
      <nav className="overflow-y-auto scrollbar-hide space-y-[8px] p-[16px]">
        {menuOptions.map((nav, index) => (
          <div
            key={nav.name}
            className={clsx('rounded-[12px]', {
              'bg-[#E2F6FE]':
                openSubmenuIndex === index &&
                (nav.subItems?.some((s) => location.pathname.startsWith(s.path)) ||
                  openSubmenuIndex === index),
            })}
          >
            {nav.subItems ? (
              <>
                <AccordionButton
                  nav={nav}
                  index={index}
                  isOpen={openSubmenuIndex === index}
                  onToggle={handleSubmenuToggle}
                  visible={visible}
                />
                {visible && openSubmenuIndex === index && (
                  <SidebarSubmenu subItems={nav.subItems} activeCheck={isActive} />
                )}
              </>
            ) : (
              <SidebarLink
                nav={nav}
                active={isActive(nav.path ?? '')}
                visible={visible}
              />
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default AppSidebar;