import { useEffect, useRef, useCallback } from 'react';

interface Props {
  onIntersect: () => void;
  enabled?: boolean;
  rootMargin?: string;
  root?: Element | null; 
}

export function useIntersectionObserver({
  onIntersect,
  enabled = true,
  rootMargin = '100px',
  root = null, 
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect(); 
        }
      },
      {
        root, 
        rootMargin,
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect(); 
    };
  }, [onIntersect, enabled, root, rootMargin]); 

  return ref; 
}
