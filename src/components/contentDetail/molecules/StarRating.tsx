import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
}

const StarRating = ({ value, onChange }: StarRatingProps) => (
  <div className="flex gap-2">
    {[1, 2, 3, 4, 5].map((num) => (
      <Star
        key={num}
        className={`w-10 h-10 cursor-pointer transition-colors ${
          num <= value
            ? "fill-custom-point text-custom-point"
            : "fill-gray-200 text-gray-200 opacity-40"
        }`}
        onClick={() => onChange(num)}
      />
    ))}
  </div>
);

export default StarRating;
