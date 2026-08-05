import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
}

const StarRating = ({ value, onChange }: StarRatingProps) => {
  const ratings = [
    { value: 1, label: "1점 - 내 취향은 아니었어요" },
    { value: 2, label: "2점 - 기대엔 못 미쳤어요" },
    { value: 3, label: "3점 - 무난하게 볼 만했어요" },
    { value: 4, label: "4점 - 추천할 수 있을 정도예요" },
    { value: 5, label: "5점 - 완전 내 스타일이에요" },
  ];

  return (
    <fieldset className="border-none p-0 m-0">
      <legend className="sr-only">작품 별점 평가</legend>
      <div className="flex gap-2" role="radiogroup" aria-label="별점 선택">
        {ratings.map((rating) => (
          <label
            key={rating.value}
            htmlFor={`star-${rating.value}`}
            className="cursor-pointer block focus-within:outline-2 focus-within:outline-custom-point focus-within:outline-offset-2 rounded-sm relative"
            aria-label={rating.label}>
            <input
              type="radio"
              id={`star-${rating.value}`}
              name="star-rating"
              value={rating.value}
              checked={value === rating.value}
              onChange={() => onChange(rating.value)}
              className="absolute opacity-0 w-10 h-10 cursor-pointer"
            />
            <Star
              className={`w-10 h-10 transition-colors ${
                rating.value <= value
                  ? "fill-custom-point text-custom-point"
                  : "fill-gray-200 text-gray-200 opacity-40"
              }`}
              aria-hidden="true"
            />
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default StarRating;
