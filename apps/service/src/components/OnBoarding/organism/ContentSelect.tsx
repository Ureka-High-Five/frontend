import { useEffect, useRef, useState } from "react";
import { Button } from "@lead-me/ui/button";
import { Input } from "@lead-me/ui/input";
import { Loader2 } from "lucide-react";
import SelectedContentList from "@/components/My/molecule/SelectedContentList";
import OnBoardingContentCard from "@/components/OnBoarding/molecule/OnBoardingContentCard";
import {
  REQUIRED_COUNT,
  ONBOARDING_SEARCH_COUNT,
} from "@/constants/onBoarding";
import { useSearchContent } from "@/hooks/onboarding/useSearchContent";
import type { OnBoardingContent } from "@lead-me/types/content";

interface ContentSelectProps {
  contents: OnBoardingContent[];
  selectedIds: number[];
  selectedContents: OnBoardingContent[];
  toggleSelect: (content: OnBoardingContent) => void;
  onSubmitOnBoarding: () => void;
}

const ContentSelect = ({
  contents,
  selectedIds,
  selectedContents,
  toggleSelect,
  onSubmitOnBoarding,
}: ContentSelectProps) => {
  const {
    searchInput,
    setSearchInput,
    searchKeyword,
    searchContents,
    isFetchingNextPage,
    scrollContainerRef,
    rootRef,
    targetRef,
  } = useSearchContent(ONBOARDING_SEARCH_COUNT);

  const displayContents = searchKeyword.length > 0 ? searchContents : contents;
  const prevContentLengthRef = useRef(displayContents.length);
  const [showNewContentNotice, setShowNewContentNotice] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const isAtBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      300;

    if (
      searchKeyword.length === 0 &&
      displayContents.length > prevContentLengthRef.current
    ) {
      if (!isAtBottom) {
        setShowNewContentNotice(true);
      } else {
        requestAnimationFrame(() => {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth",
          });
        });
      }
    }

    prevContentLengthRef.current = displayContents.length;
  }, [displayContents.length, scrollContainerRef, searchKeyword.length]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;

    const handleScroll = () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      animationFrameId = requestAnimationFrame(() => {
        const scrollGap =
          container.scrollHeight - container.scrollTop - container.clientHeight;

        if (scrollGap <= 150 && showNewContentNotice) {
          setShowNewContentNotice(false);
        }
      });
    };

    container.addEventListener("scroll", handleScroll);

    // eslint-disable-next-line consistent-return
    return () => {
      container.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollContainerRef, showNewContentNotice]);

  useEffect(() => {
    if (searchKeyword.length > 0 && showNewContentNotice) {
      setShowNewContentNotice(false);
    }
  }, [searchKeyword, showNewContentNotice]);

  const scrollToBottom = () => {
    const container = scrollContainerRef.current;

    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
      setShowNewContentNotice(false);
    }
  };

  return (
    <>
      <Input
        type="text"
        placeholder="좋아하는 작품을 검색해보세요"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="w-[90%] max-w-sm text-white placeholder:text-gray-500 bg-white text-custom-black h-10"
      />

      <div className="w-[90%] max-w-sm">
        <SelectedContentList
          selectedContents={selectedContents}
          onRemove={toggleSelect}
        />
      </div>

      <div
        ref={(el) => {
          rootRef.current = el;
          scrollContainerRef.current = el;
        }}
        className="relative w-[90%] max-w-sm overflow-y-auto overflow-x-hidden no-scrollbar flex-1">
        <ul className="grid grid-cols-3 gap-x-10 gap-y-6">
          {displayContents.map((content) => (
            <OnBoardingContentCard
              key={content.contentId}
              title={content.title}
              thumbnailUrl={content.thumbnailUrl}
              openYear={content.openYear}
              isSelected={selectedIds.includes(content.contentId)}
              toggleSelect={() => toggleSelect(content)}
            />
          ))}
        </ul>

        {searchKeyword && <div ref={targetRef} className="h-6" />}
        {isFetchingNextPage && (
          <div className="flex items-center w-full justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-custom-point mb-4" />
          </div>
        )}

        {searchKeyword &&
          searchContents.length === 0 &&
          !isFetchingNextPage && (
            <p className="body-lg-pretendard text-center text-custom-gray py-28">
              검색 결과가 없어요
              <br />
              <span className="body-md-pretendard mt-2">
                다른 키워드로 다시 검색해보세요!
              </span>
            </p>
          )}
      </div>

      {showNewContentNotice && (
        <div className="fixed bottom-[96px] z-20">
          <Button
            variant="ghost"
            className="body-md-pretendard px-8 py-2 rounded-lg
                 bg-white/60 backdrop-blur-sm shadow-lg
                 text-custom-black transition hover:bg-white/80"
            onClick={scrollToBottom}>
            🎬 새로운 콘텐츠가 추가됐어요
          </Button>
        </div>
      )}

      <Button
        size="lg"
        disabled={selectedIds.length < REQUIRED_COUNT}
        className="w-[90%] max-w-sm bg-custom-point text-custom-black body-lg-dohyeon flex items-center justify-center hover:bg-custom-point/90 hover:text-custom-black"
        onClick={onSubmitOnBoarding}>
        시작하기
      </Button>
    </>
  );
};

export default ContentSelect;
