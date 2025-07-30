import { useRef, useState } from "react";
import { X } from "lucide-react";
import CurationForm from "@/components/My/molecule/CurationForm";
import SearchContentList from "@/components/My/molecule/SearchContentList";
import SelectedContentList from "@/components/My/molecule/SelectedContentList";
import { Button } from "@/components/ui/button";
import { ONBOARDING_SEARCH_COUNT } from "@/constants/onBoarding";
import useContentSelector from "@/hooks/my/useContentSelector";
import useCurationSubmit from "@/hooks/my/useCurationSubmit";
import { useSearchContent } from "@/hooks/onboarding/useSearchContent";

interface CreateCurationModalProps {
  onClose: () => void;
}

const CreateCurationModal = ({ onClose }: CreateCurationModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { contentId, selectedContents, toggleSelect } = useContentSelector();
  const { handleSubmit } = useCurationSubmit({
    title,
    description,
    titleRef,
    descriptionRef,
    contentId,
    selectedContents,
    onClose,
  });
  const {
    searchInput,
    setSearchInput,
    searchKeyword,
    searchContents,
    isFetchingNextPage,
    rootRef,
    targetRef,
  } = useSearchContent(ONBOARDING_SEARCH_COUNT);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4 sm:px-6 py-10">
      <div className="flex flex-col gap-4 bg-custom-darkgray w-[90%] max-w-md max-h-full overflow-y-auto no-scrollbar rounded-md p-6 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-white">
          <X size={24} />
        </button>

        <h2 className="heading-h2-pretendard font-bold text-white">
          큐레이션 등록
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <CurationForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            titleRef={titleRef}
            descriptionRef={descriptionRef}
            searchInputRef={searchInputRef}
          />

          <SelectedContentList
            selectedContents={selectedContents}
            onRemove={toggleSelect}
          />

          <SearchContentList
            searchContents={searchContents}
            contentId={contentId}
            toggleSelect={toggleSelect}
            rootRef={rootRef}
            targetRef={targetRef}
            isFetchingNextPage={isFetchingNextPage}
            searchKeyword={searchKeyword}
          />

          <Button
            type="submit"
            size="lg"
            className="w-full bg-custom-point text-custom-black body-lg-dohyeon flex items-center justify-center hover:bg-custom-point/90 hover:text-custom-black">
            등록
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateCurationModal;
