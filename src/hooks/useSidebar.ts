import { useState, useCallback } from 'react';
import { SidebarPosition } from '../types';

export const useSidebar = () => {
  const [sidebarWidth, setSidebarWidthState] = useState(250);
  const [sidebarPosition, setSidebarPosition] = useState<SidebarPosition>('left');
  const [isResizing, setIsResizing] = useState(false);

  const initSidebar = useCallback(() => {
    const savedWidth = localStorage.getItem('sidebarWidth');
    const savedPosition = localStorage.getItem('sidebarPosition') as SidebarPosition;

    if (savedWidth) {
      setSidebarWidthState(parseInt(savedWidth, 10));
    }
    if (savedPosition) {
      setSidebarPosition(savedPosition);
    }
  }, []);

  const setSidebarWidth = useCallback((width: number) => {
    setSidebarWidthState(width);
    localStorage.setItem('sidebarWidth', String(width));
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsResizing(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  const togglePosition = useCallback(() => {
    setSidebarPosition(prev => {
      const newPosition: SidebarPosition = prev === 'left' ? 'right' : 'left';
      localStorage.setItem('sidebarPosition', newPosition);
      return newPosition;
    });
  }, []);

  return {
    sidebarWidth,
    setSidebarWidth,
    sidebarPosition,
    isResizing,
    setIsResizing,
    initSidebar,
    handleMouseDown,
    handleMouseUp,
    togglePosition,
  };
};
