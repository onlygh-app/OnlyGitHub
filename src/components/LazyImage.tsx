import React, { memo, useRef, useEffect, useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

const LazyImageComponent: React.FC<LazyImageProps> = ({ src, alt, className }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && imgRef.current && !isLoaded) {
          imgRef.current.src = src;
          setIsLoaded(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src, isLoaded]);

  return (
    <img
      ref={imgRef}
      alt={alt}
      className={className}
      style={{
        backgroundColor: 'rgba(88, 166, 255, 0.1)',
      }}
    />
  );
};

export const LazyImage = memo(LazyImageComponent);
