import { CheckCircle } from "lucide-react";
import FallbackImage from "@/components/common/atom/FallbackImage";

interface OnBoardingContentCardProps {
  title: string;
  thumbnailUrl: string;
  openYear: number;
  isSelected: boolean;
  toggleSelect: () => void;
}

const OnBoardingContentCard = ({
  title,
  thumbnailUrl,
  openYear,
  isSelected,
  toggleSelect,
}: OnBoardingContentCardProps) => {
  return (
    <li>
      <article className="flex flex-col items-center">
        <button
          type="button"
          onClick={toggleSelect}
          aria-pressed={isSelected}
          className="relative rounded-xl w-full aspect-[2/3] border border-[#262626]">
          <FallbackImage
            src={thumbnailUrl}
            alt={title}
            className="transition duration-300 w-full h-full object-cover rounded-xl"
          />
          {isSelected && (
            <>
              <div className="absolute inset-0 z-10 bg-custom-gray/40 backdrop-blur-[1px] rounded-xl" />
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-custom-point" />
              </div>
            </>
          )}
        </button>

        <h3 className="body-md-dohyeon text-white mt-2 text-center">{title}</h3>
        <p className="body-xs-pretendard text-custom-gray text-center">
          {openYear}
        </p>
      </article>
    </li>
  );
};

export default OnBoardingContentCard;
