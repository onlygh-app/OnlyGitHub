import React, { memo, useRef, useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

const LazyImageComponent: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  width = 48,
  height = 48,
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageTriggered, setImageTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && imgRef.current && !imageTriggered) {
          setIsLoading(true);
          setImageTriggered(true);
          imgRef.current.src = src;
        }
      },
      {
        rootMargin: '50px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [src, imageTriggered]);

  const handleImageLoad = () => {
    setIsLoading(false);
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setIsLoading(false);
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#30363d',
        borderRadius: '50%',
        overflow: 'hidden',
      }}
    >
      {isLoading && (
        <CircularProgress
          size={width * 0.6}
          thickness={4}
          sx={{
            color: '#58a6ff',
            position: 'absolute',
          }}
        />
      )}
      <img
        ref={imgRef}
        alt={alt}
        className={className}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />
    </Box>
  );
};

export const LazyImage = memo(LazyImageComponent);
