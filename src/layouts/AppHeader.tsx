import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TieredMenu } from 'primereact/tieredmenu';
import type { MenuItem } from 'primereact/menuitem';
import type { RootState } from '@/store/store.ts';
import { clearLocalStorage } from '@utils/utils.ts';
import { LOGIN_ROUTE, PROFILE_ROUTE } from '@utils/constant/app-route.constants.ts';
import { ChevronDown, LogOut, User } from 'lucide-react';
import { SidebarToggleButton } from '@layouts/AppSidebar.tsx';
import styled from 'styled-components';
import { useSidebar } from '@context/SidebarContext.tsx';

const HeaderSidebarToggleContainer = styled.div`
    width: 32px;
    height: 32px;
    position: relative;

    button {
        border-radius: 8px;
        width: 32px;
        height: 32px;

        svg {
            width: 24px;
            height: 24px;
        }

    }

`;

const HeaderContainer = styled.header`
    height: 68px;
    background-color: #FAFAFA98;
    backdrop-filter: blur(20px);
    border-bottom: 1px solid #FAFAFA;

    .page-title {
        font-size: 20px;
        font-weight: 500;
    }

    .btn-profile {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 12px;

        .avatar-container {
            width: 32px;
            height: 32px;
            min-width: 32px;
            min-height: 32px;
            background-color: #17609E;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            border-radius: 24px;

            svg {
                width: 24px;
                height: 24px;
            }

        }

        .user-meta-container {
            display: flex;
            flex-direction: column;
            gap: 0;
            align-items: flex-start;
            justify-content: center;
            white-space: nowrap;

            .user-name {
                font-size: 16px;
                font-weight: 500;
            }

            .user-desig {
                color: #979797;
                font-size: 12px;
                font-weight: 500;
            }

        }

    }

`;

interface UserMenuProps {
  onProfile: () => void;
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ onProfile, onLogout }) => {
  const menuRef = useRef<TieredMenu | null>(null);
  const menuItems: MenuItem[] = [
    { label: 'Profile', icon: <User />, command: onProfile },
    { label: 'Logout', icon: <LogOut />, command: onLogout },
  ];

  return (
    <>
      <button
        className="btn-profile"
        onClick={(e) => menuRef.current?.toggle(e)}
      >
        <div className="avatar-container">
          <User className="h-6 w-6" />
        </div>
        <div className="user-meta-container">
          <span className="user-name">
            Umar Farooq
          </span>
          <span className="user-desig">
            Van Representative
          </span>
        </div>
        <ChevronDown />
      </button>

      <TieredMenu model={menuItems} popup ref={menuRef} />
    </>
  );
};

// ============================================================
// 🔹 App Header (main component)
// ============================================================
const AppHeader: React.FC = () => {
  const { pageTitle } = useSelector((state: RootState) => state.metadata);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    clearLocalStorage();
    navigate(LOGIN_ROUTE);
  };

  const handleProfile = () => {
    navigate(PROFILE_ROUTE);
  };

  const { isExpanded } = useSidebar();

  // ✅ Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <HeaderContainer
      className="sticky top-0 flex w-full z-50">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        {/* 🔸 Left: Sidebar toggle + Title */}
        <div
          className="flex items-center justify-between w-full gap-[24px] px-3 py-3 border-b border-gray-200 dark:border-gray-800 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
          {!isExpanded && <HeaderSidebarToggleContainer>
            <SidebarToggleButton />
          </HeaderSidebarToggleContainer>}
          <h2 className="page-title">{pageTitle}</h2>
        </div>

        {/* 🔸 Right: User menu */}
        <div className="px-3 py-3 lg:px-0 lg:py-4">
          <UserMenu onProfile={handleProfile} onLogout={handleLogout} />
        </div>
      </div>
    </HeaderContainer>
  );
};

export default AppHeader;