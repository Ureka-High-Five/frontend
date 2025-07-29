import { useState } from "react";
import { ImageOff } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLazyIntersectionObserver } from "@/hooks/common/useLazyIntersectionObserver";
import { cn } from "@/utils/cn";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
}

const LazyImage = ({
  src,
  alt,
  className,
  skeletonClassName,
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { ref, isIntersecting } = useLazyIntersectionObserver();

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      {!isIntersecting || !isLoaded ? (
        <Skeleton
          className={cn("w-full h-full bg-gray-700", skeletonClassName)}
        />
      ) : null}

      {isIntersecting && !hasError && (
        <img
          src={src}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}

      {isIntersecting && hasError && (
        <div
          role="img"
          aria-label="이미지를 표시할 수 없습니다"
          className="w-full h-full flex items-center justify-center rounded-xl p-2 bg-custom-darkgray">
          <ImageOff className="w-8 h-8 text-white/70" />
        </div>
      )}
    </div>
  );
};

export default LazyImage;
