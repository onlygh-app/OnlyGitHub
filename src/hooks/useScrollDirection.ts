import { useState, useEffect, useRef, useCallback } from 'react';

export const useScrollDirection = (onScroll?: (scrollY: number) => void) => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScrollChange = useCallback((currentScrollY: number) => {
    if (onScroll) {
      onScroll(currentScrollY);
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 向上滚动时显示
    if (currentScrollY < lastScrollYRef.current) {
      setIsVisible(true);
    }
    // 向下滚动时隐藏（只在滚动距离大于50px时）
    else if (currentScrollY - lastScrollYRef.current > 50) {
      setIsVisible(false);
    }

    lastScrollYRef.current = currentScrollY;

    // 停止滚动500ms后确保header显示
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 500);
  }, [onScroll]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { isVisible, handleScrollChange };
};
