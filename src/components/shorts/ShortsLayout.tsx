import { useNavigate } from "react-router-dom";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/common/useIntersectionObserver";
import type { ShortsItem } from "@/types/shorts";
import ReelCard from "./organism/ReelCard";

interface ShortsLayoutProps {
  shorts: ShortsItem[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const ShortsLayout = ({
  shorts,
  fetchNextPage,
  hasNextPage,
  isLoading,
  cardRefs,
}: ShortsLayoutProps) => {
  const navigate = useNavigate();
  const cardRef = cardRefs;

  const { rootRef, targetRef } = useIntersectionObserver({
    onIntersect: () => {
      if (!isLoading && hasNextPage) {
        fetchNextPage();
      }
    },
    hasNextPage,
    enabled: true,
    threshold: 0.1,
    delayMs: 100,
  });

  const handleClose = () => {
    navigate(-1); // 뒤로 가기
  };

  return (
    <div
      ref={rootRef}
      className="relative w-full h-screen overflow-y-scroll snap-y snap-mandatory">
      <div className="fixed top-4 left-2 z-10 text-white">
        <Button variant="ghost" onClick={handleClose}>
          <X className="w-6 h-6" />
        </Button>
      </div>

      {shorts.map((reel, idx) => (
        <div
          key={reel.shortsId}
          ref={(el) => {
            cardRef.current[idx] = el;
          }}>
          <ReelCard reel={reel} />
          {/* 마지막에서 세 번째 쇼츠에서 트리거 (더 빠른 로딩) */}
          {idx === shorts.length - 3 && <div ref={targetRef} className="h-1" />}
        </div>
      ))}

      {/* 마지막 쇼츠가 3개 이하로 남았을 때를 위한 fallback */}
      {shorts.length <= 3 && <div ref={targetRef} className="h-1" />}
    </div>
  );
};

export default ShortsLayout;
