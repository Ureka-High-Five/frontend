import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CurationFormProps {
  title: string;
  description: string;
  searchInput: string;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setSearchInput: (value: string) => void;
  titleRef: React.RefObject<HTMLInputElement | null>;
  descriptionRef: React.RefObject<HTMLTextAreaElement | null>;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
}

const CurationForm = ({
  title,
  description,
  searchInput,
  setTitle,
  setDescription,
  setSearchInput,
  titleRef,
  descriptionRef,
  searchInputRef,
}: CurationFormProps) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="body-lg-pretendard text-white">제목</p>
        <Input
          ref={titleRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={20}
          placeholder="제목을 입력하세요"
          className="placeholder:text-gray-500 bg-white text-custom-black h-10 body-lg-pretendard"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="body-lg-pretendard text-white">설명</p>
        <Textarea
          ref={descriptionRef}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={100}
          placeholder="설명을 입력하세요"
          className="placeholder:text-gray-500 bg-white text-custom-black h-20 body-lg-pretendard no-scrollbar"
        />
        <p className="text-right body-md-pretendard text-custom-gray">
          {description.trim().length} / 100
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="body-lg-pretendard text-white">콘텐츠 검색</p>
        <Input
          ref={searchInputRef}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="좋아하는 작품을 검색해보세요"
          className="placeholder:text-gray-500 bg-white text-custom-black h-10 body-lg-pretendard"
          onFocus={() => {
            searchInputRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        />
      </div>
    </>
  );
};

export default CurationForm;
