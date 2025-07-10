import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ReviewInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
}

const ReviewInput = ({ value, onChange, onSend }: ReviewInputProps) => (
  <div className="w-full mx-auto flex items-center gap-2 mt-2 border-b border-white">
    <Input
      className="bg-transparent border-none text-white placeholder-gray-300 focus-visible:ring-0 focus-visible:outline-none"
      placeholder="리뷰를 남겨주세요"
      value={value}
      onChange={onChange}
    />
    <button type="button" className="p-1" onClick={onSend}>
      <Send className="w-6 h-6 text-gray-300" />
    </button>
  </div>
);

export default ReviewInput;
