import { useRef, useState } from "react";
import { X } from "lucide-react";
import CurationForm from "@/components/My/molecule/CurationForm";
import SearchContentList from "@/components/My/molecule/SearchContentList";
import SelectedContentList from "@/components/My/molecule/SelectedContentList";
import { Button } from "@/components/ui/button";
import { ONBOARDING_SEARCH_COUNT } from "@/constants/onBoarding";
import useFileUpload from "@/hooks/common/useFileUpload";
import { useSearchContent } from "@/hooks/onboarding/useSearchContent";
import useCreateCurationMutation from "@/hooks/queries/curation/useCreateCurationMutation";
import generateThumbnailImages from "@/utils/generateThumbnailImages";
import { makeToast } from "@/utils/makeToast";
import type { OnBoardingContent } from "@/types/content";

interface CreateCurationModalProps {
  onClose: () => void;
}

const CreateCurationModal = ({ onClose }: CreateCurationModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contentId, setContentId] = useState<number[]>([]);
  const [selectedMap, setSelectedMap] = useState<
    Record<number, OnBoardingContent>
  >({});
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const selectedContents = contentId.map((id) => selectedMap[id]);

  const { mutateCreateMyCuration } = useCreateCurationMutation(onClose);
  const {
    searchInput,
    setSearchInput,
    searchKeyword,
    searchContents,
    isFetchingNextPage,
    rootRef,
    targetRef,
  } = useSearchContent(ONBOARDING_SEARCH_COUNT);
  const { uploadFile } = useFileUpload();

  const validateForm = () => {
    if (!title.trim()) {
      makeToast("제목을 입력해주세요.", "warning");
      titleRef.current?.focus();
      return false;
    }

    if (!description.trim()) {
      makeToast("설명을 입력해주세요.", "warning");
      descriptionRef.current?.focus();
      return false;
    }

    if (contentId.length === 0) {
      makeToast("콘텐츠를 1개 이상 선택해주세요.", "warning");
      return false;
    }

    return true;
  };

  const toggleSelect = (content: OnBoardingContent) => {
    setContentId((prev) =>
      prev.includes(content.contentId)
        ? prev.filter((id) => id !== content.contentId)
        : [...prev, content.contentId]
    );

    setSelectedMap((prev) => {
      const newMap = { ...prev };
      if (newMap[content.contentId]) delete newMap[content.contentId];
      else newMap[content.contentId] = content;
      return newMap;
    });
  };

  const generateAndUploadThumnail = async (): Promise<string | null> => {
    const selected = contentId.map((id) => selectedMap[id]);
    const urls = selected.map((content) => content.thumbnailUrl);
    const file = await generateThumbnailImages(urls);

    if (!file) {
      makeToast(
        "썸네일 생성에 실패했어요. 잠시 후 다시 시도해 주세요.",
        "warning"
      );
      return null;
    }

    return uploadFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const thumbnailUrl = await generateAndUploadThumnail();
    if (thumbnailUrl) {
      mutateCreateMyCuration({
        title,
        description,
        contents: contentId,
        thumbnail: thumbnailUrl,
      });
    }
  };

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
            className="w-full bg-custom-point text-custom-black body-lg-dohyeon flex items-center justify-center">
            등록
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateCurationModal;
