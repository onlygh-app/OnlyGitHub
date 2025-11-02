import React, { useRef } from 'react';
import { PageType } from '../types';

interface SidebarProps {
  width: number;
  position: 'left' | 'right';
  currentPage: PageType;
  pageTitle: string;
  pageSubtitle: string;
  isResizing: boolean;
  onMouseDown: () => void;
  onPageChange: (page: PageType) => void;
  onTogglePosition: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  width,
  position,
  currentPage,
  pageTitle,
  pageSubtitle,
  isResizing,
  onMouseDown,
  onPageChange,
  onTogglePosition,
  onLogout,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

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
            <p className="current-page-subtitle">{pageSubtitle}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${currentPage === 'explore' ? 'active' : ''}`}
            onClick={() => onPageChange('explore')}
          >
            <span className="nav-icon">E</span>
            <span className="nav-label">Explore</span>
          </button>
          <button
            className={`nav-item ${currentPage === 'trending' ? 'active' : ''}`}
            onClick={() => onPageChange('trending')}
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
          <button onClick={onLogout} className="logout-btn">
            <span className="nav-icon">L</span>
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </aside>

      <div
        className="resize-handle"
        onMouseDown={onMouseDown}
        style={{ cursor: isResizing ? 'col-resize' : 'default' }}
      />
    </>
  );
};
