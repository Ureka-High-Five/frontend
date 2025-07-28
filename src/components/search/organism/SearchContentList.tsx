import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import SearchContentItem from "@/components/search/molecules/SearchContentItem";
import { Input } from "@/components/ui/input";
import { PATH } from "@/constants/path";
import { useSearchContent } from "@/hooks/onboarding/useSearchContent";

const SEARCH_LIMIT = 10;

export default function SearchContentList() {
  const navigate = useNavigate();
  const {
    searchInput,
    setSearchInput,
    searchKeyword,
    searchContents,
    isFetchingNextPage,
    rootRef,
    targetRef,
  } = useSearchContent(SEARCH_LIMIT);

  const handleItemClick = (contentId: number) => {
    navigate(PATH.CONTENT_DETAIL.replace(":id", String(contentId)));
  };

  return (
    <div
      ref={(el) => {
        rootRef.current = el as HTMLDivElement | null;
      }}
      className="w-full flex flex-col py-4 max-h-[80vh] overflow-y-auto no-scrollbar gap-5 md:px-8 md:py-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
        <Input
          placeholder="콘텐츠 검색"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          inputMode="text"
          className="pl-10 pr-4 bg-gray-500/30 py-2 rounded-xl border-none focus-visible:ring-0 focus:outline-none"
        />
      </div>

      <ul className="flex flex-col gap-2">
        {searchContents.map((searchContent) => (
          <SearchContentItem
            key={searchContent.contentId}
            contentId={searchContent.contentId}
            title={searchContent.title}
            openYear={searchContent.openYear}
            thumbnailUrl={searchContent.thumbnailUrl}
            onClick={handleItemClick}
          />
        ))}
        {searchKeyword &&
          searchContents.length === 0 &&
          !isFetchingNextPage && (
            <div className="text-center text-gray-400 py-28">
              컨텐츠가 없습니다
            </div>
          )}
      </ul>

      {searchKeyword && <div ref={targetRef} className="h-6" />}
      {isFetchingNextPage && (
        <div className="text-center text-gray-400">불러오는 중...</div>
      )}
    </div>
  );
}
