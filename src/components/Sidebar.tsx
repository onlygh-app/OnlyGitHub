import React, { useRef, memo, useCallback } from 'react';
import { PageType } from '../types';

interface SidebarProps {
  width: number;
  position: 'left' | 'right';
  currentPage: PageType;
  pageTitle: string;
  isResizing: boolean;
  onMouseDown: () => void;
  onPageChange: (page: PageType) => void;
  onTogglePosition: () => void;
  onLogout: () => void;
}

const SidebarComponent: React.FC<SidebarProps> = ({
  width,
  position,
  currentPage,
  pageTitle,
  isResizing,
  onMouseDown,
  onPageChange,
  onTogglePosition,
  onLogout,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleNavClick = useCallback((page: PageType) => {
    onPageChange(page);
  }, [onPageChange]);

  return (
    <>
      <aside
        className="sidebar"
        ref={sidebarRef}
        style={{ width: `${width}px` }}
      >
        <div className="sidebar-header">
          <div className="sidebar-title">
            <h1>OnlyGitHub</h1>
            <p className="current-page">{pageTitle}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${currentPage === 'explore' ? 'active' : ''}`}
            onClick={() => handleNavClick('explore')}
            title="Explore repositories"
          >
            <span className="nav-icon">E</span>
            <span className="nav-label">Explore</span>
          </button>
          <button
            className={`nav-item ${currentPage === 'trending' ? 'active' : ''}`}
            onClick={() => handleNavClick('trending')}
            title="View trending repositories"
          >
            <span className="nav-icon">T</span>
            <span className="nav-label">Trending</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button
            onClick={onTogglePosition}
            className="position-btn"
            title={`Move to ${position === 'left' ? 'right' : 'left'}`}
          >
            <span className="nav-icon">P</span>
            <span className="nav-label">Move</span>
          </button>
          <button onClick={onLogout} className="logout-btn" title="Logout">
            <span className="nav-icon">L</span>
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </aside>

      <div
        className="resize-handle"
        onMouseDown={onMouseDown}
        style={{ cursor: isResizing ? 'col-resize' : 'pointer' }}
        role="separator"
        aria-label="Sidebar resize handle"
      />
    </>
  );
};

export const Sidebar = memo(SidebarComponent);
