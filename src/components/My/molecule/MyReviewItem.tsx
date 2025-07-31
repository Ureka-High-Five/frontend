import { Star, Trash2 } from "lucide-react";
import FallbackImage from "@/components/common/atom/FallbackImage";

interface MyReviewItemProps {
  reviewId: number;
  thumbnailUrl: string;
  title: string;
  review: string;
  rating: number;
  onDeleteClick: (id: number) => void;
}

const MyReviewItem = ({
  reviewId,
  thumbnailUrl,
  title,
  review,
  rating,
  onDeleteClick,
}: MyReviewItemProps) => {
  return (
    <li className="flex gap-4 border-b border-custom-darkgray pb-4">
      <FallbackImage
        src={thumbnailUrl}
        alt={title}
        className="w-[100px] h-[150px] rounded-md"
      />
      <div className="flex flex-col flex-1 text-white py-1 gap-2">
        <h3 className="body-lg-pretendard break-all">{title}</h3>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((num) => (
            <Star
              key={num}
              className={`w-5 h-5 ${
                num <= rating
                  ? "fill-custom-point text-custom-point"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>
        <p className="body-md-pretendard text-gray-300 break-all">{review}</p>
      </div>
      <button
        type="button"
        aria-label="리뷰 삭제"
        onClick={() => onDeleteClick(reviewId)}
        className="text-white hover:text-red-500 transition-colors self-start">
        <Trash2 size={18} />
      </button>
    </li>
  );
};

export default MyReviewItem;
