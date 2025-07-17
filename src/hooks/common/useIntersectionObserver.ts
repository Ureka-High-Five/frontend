import { useEffect, useRef, type RefObject } from "react";

interface UseIntersectionObserverProps {
  onIntersect: () => void;
  hasNextPage?: boolean;
  threshold?: number | number[];
  delayMs?: number;
  rootMargin?: string;
  root?: Element | null;
  enabled?: boolean;
}

export const useIntersectionObserver = ({
  onIntersect,
  hasNextPage = true,
  threshold = 0.5,
  delayMs = 300,
  rootMargin = "0px",
  root = null,
  enabled = true,
}: UseIntersectionObserverProps): RefObject<HTMLDivElement | null> => {
  const ref = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const target = ref.current;

    if (!enabled || !target || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
              onIntersect();
            }, delayMs);
          }
        });
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [onIntersect, hasNextPage, threshold, delayMs, rootMargin, root, enabled]);

  return ref;
};
