import { useEffect, useRef, type RefObject } from "react";

interface UseIntersectionObserverProps {
  onIntersect: () => void;
  hasNextPage?: boolean;
  threshold?: number | number[];
  delayMs?: number;
  rootMargin?: string;
  enabled?: boolean;
}

export const useIntersectionObserver = ({
  onIntersect,
  hasNextPage = true,
  threshold = 0.5,
  delayMs = 1000,
  rootMargin = "0px",
  enabled = true,
}: UseIntersectionObserverProps): {
  rootRef: RefObject<HTMLDivElement | null>;
  targetRef: RefObject<HTMLDivElement | null>;
} => {
  const rootRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const target = targetRef.current;

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

    // eslint-disable-next-line consistent-return
    return () => {
      observer.disconnect();

      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [onIntersect, hasNextPage, threshold, delayMs, rootMargin, enabled]);

  return { rootRef, targetRef };
};
