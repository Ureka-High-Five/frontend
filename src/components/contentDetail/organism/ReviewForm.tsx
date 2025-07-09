import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const RATING_MESSAGES = [
  "내 취향은 아니었어요",
  "기대엔 못 미쳤어요",
  "무난하게 볼 만했어요",
  "추천할 수 있을 정도예요",
  "완전 내 스타일이에요",
];

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);

  useEffect(() => {
    let messageTimer: ReturnType<typeof setTimeout>;
    let inputTimer: ReturnType<typeof setTimeout>;
    if (rating > 0) {
      setIsMessageVisible(true);
      setIsInputVisible(false);
      messageTimer = setTimeout(() => {
        setIsMessageVisible(false);
        inputTimer = setTimeout(() => setIsInputVisible(true), 300);
      }, 1000);
    }
    return () => {
      clearTimeout(messageTimer);
      clearTimeout(inputTimer);
    };
  }, [rating]);

  return (
    <Card className="bg-custom-darkgray border-none min-h-36 rounded-xl flex flex-col items-center justify-center gap-2">
      {/* 별점 선택 */}
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <Star
            key={num}
            className={`w-10 h-10 cursor-pointer transition-colors ${
              num <= rating
                ? "fill-custom-point text-custom-point"
                : "fill-gray-200 text-gray-200 opacity-40"
            }`}
            onClick={() => setRating(num)}
          />
        ))}
      </div>

      {/* 멘트 & 입력창 통합 영역 */}
      <div className="w-full min-h-[50px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {rating === 0 && (
            <motion.div
              key="default"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="body-md-pretendard text-custom-gray">
              이 작품 어떠셨나요?
            </motion.div>
          )}

          {rating > 0 && isMessageVisible && (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="body-md-pretendard text-custom-gray">
              {RATING_MESSAGES[rating - 1]}
            </motion.div>
          )}

          {isInputVisible && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-[85%] mx-auto flex items-center gap-2 mt-2 border-b border-white">
              <Input
                className="bg-transparent border-none text-white placeholder-gray-300 focus-visible:ring-0 focus-visible:outline-none"
                placeholder="리뷰를 남겨주세요"
              />
              <button type="button" className="p-1">
                <Send className="w-6 h-6 text-gray-300" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default ReviewForm;
