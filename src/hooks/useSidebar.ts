import { useState, useEffect, useCallback } from 'react';
import { SidebarPosition } from '../types';
import { storageService } from '../services/storage';

export const useSidebar = () => {
  const [sidebarWidth, setSidebarWidth] = useState<number>(260);
  const [sidebarPosition, setSidebarPosition] = useState<SidebarPosition>('left');
  const [isResizing, setIsResizing] = useState<boolean>(false);

  const initSidebar = useCallback(() => {
    const savedWidth = storageService.getSidebarWidth(260);
    const savedPosition = storageService.getSidebarPosition('left');
    setSidebarWidth(savedWidth);
    setSidebarPosition(savedPosition);
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsResizing(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const minWidth = 200;
      const maxWidth = 500;
      let newWidth = e.clientX;

      if (sidebarPosition === 'right') {
        newWidth = window.innerWidth - e.clientX;
      }

      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setSidebarWidth(newWidth);
        storageService.setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, sidebarPosition]);

  const togglePosition = useCallback(() => {
    const newPosition = sidebarPosition === 'left' ? 'right' : 'left';
    setSidebarPosition(newPosition);
    storageService.setSidebarPosition(newPosition);
  }, [sidebarPosition]);

  return {
    sidebarWidth,
    sidebarPosition,
    isResizing,
    initSidebar,
    handleMouseDown,
    togglePosition,
  };
};
