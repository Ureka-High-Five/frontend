import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CurationFormProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  searchInput: string;
  setSearchInput: (value: string) => void;
}

const CurationForm = ({
  title,
  setTitle,
  description,
  setDescription,
  searchInput,
  setSearchInput,
}: CurationFormProps) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="body-lg-pretendard text-white">제목</p>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="placeholder:text-gray-500 bg-white text-custom-black h-10 body-lg-pretendard"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="body-lg-pretendard text-white">설명</p>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="설명을 입력하세요"
          className="placeholder:text-gray-500 bg-white text-custom-black h-20 body-lg-pretendard no-scrollbar"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="body-lg-pretendard text-white">콘텐츠 검색</p>
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="좋아하는 작품을 검색해보세요"
          className="placeholder:text-gray-500 bg-white text-custom-black h-10 body-lg-pretendard"
        />
      </div>
    </>
  );
};

export default CurationForm;
