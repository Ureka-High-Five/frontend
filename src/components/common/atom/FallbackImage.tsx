import { useState } from "react";

const FallbackImage = ({
  src,
  alt,
  className,
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [isError, setIsError] = useState(false);

  if (isError || !src) {
    return (
      <div
        role="img"
        aria-label="이미지를 불러올 수 없습니다"
        className="w-full h-full flex items-center justify-center rounded-xl bg-custom-darkgray text-white body-md-pretendard">
        이미지 없음
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setIsError(true)}
      className={className}
      {...rest}
    />
  );
};

export default FallbackImage;
