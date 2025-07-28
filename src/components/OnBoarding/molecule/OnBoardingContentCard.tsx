import { CheckCircle } from "lucide-react";
import FallbackImage from "@/components/common/atom/FallbackImage";

interface OnBoardingContentCardProps {
  contentId: number;
  title: string;
  thumbnailUrl: string;
  openYear: number;
  isSelected: boolean;
  toggleSelect: (id: number) => void;
}

const OnBoardingContentCard = ({
  contentId,
  title,
  thumbnailUrl,
  openYear,
  isSelected,
  toggleSelect,
}: OnBoardingContentCardProps) => {
  return (
    <li className="flex flex-col items-center">
      <button
        type="button"
        onClick={() => toggleSelect(contentId)}
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

      <span className="body-md-dohyeon text-white mt-2 text-center">
        {title}
      </span>
      <span className="body-xs-pretendard text-custom-gray text-center">
        {openYear}
      </span>
    </li>
  );
};

export default OnBoardingContentCard;
