import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import AnimatedFadeIn from "@/components/common/atom/AnimatedFadeIn";
import { Card } from "@/components/ui/card";
import RatingMessage from "../molecules/RatingMessage";
import ReviewInput from "../molecules/ReviewInput";
import StarRating from "../molecules/StarRating";

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
  const [inputValue, setInputValue] = useState("");

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
      <StarRating value={rating} onChange={setRating} />
      <div className="w-full min-h-[50px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {rating === 0 && (
            <AnimatedFadeIn keyName="default">
              <RatingMessage message="이 작품 어떠셨나요?" />
            </AnimatedFadeIn>
          )}
          {rating > 0 && isMessageVisible && (
            <AnimatedFadeIn keyName="message">
              <RatingMessage message={RATING_MESSAGES[rating - 1]} />
            </AnimatedFadeIn>
          )}
          {isInputVisible && (
            <AnimatedFadeIn keyName="input">
              <ReviewInput
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onSend={() => {
                  /* 전송 로직 */
                }}
              />
            </AnimatedFadeIn>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default ReviewForm;
