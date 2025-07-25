import type { RefObject } from "react";
import useFileUpload from "@/hooks/common/useFileUpload";
import useCreateCurationMutation from "@/hooks/queries/curation/useCreateCurationMutation";
import generateThumbnailImages from "@/utils/generateThumbnailImages";
import { makeToast } from "@/utils/makeToast";
import type { OnBoardingContent } from "@/types/content";

interface Props {
  title: string;
  description: string;
  titleRef: RefObject<HTMLInputElement | null>;
  descriptionRef: RefObject<HTMLTextAreaElement | null>;
  contentId: number[];
  selectedContents: OnBoardingContent[];
  onClose: () => void;
}

const useCurationSubmit = ({
  title,
  description,
  titleRef,
  descriptionRef,
  contentId,
  selectedContents,
  onClose,
}: Props) => {
  const { uploadFile } = useFileUpload();
  const { mutateCreateMyCuration } = useCreateCurationMutation(onClose);

  const validate = (): boolean => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const urls = selectedContents.map((c) => c.thumbnailUrl);
    const file = await generateThumbnailImages(urls);

    if (!file) {
      makeToast("썸네일 생성에 실패했어요.", "warning");

      return;
    }

    const thumbnailUrl = await uploadFile(file);
    if (thumbnailUrl) {
      mutateCreateMyCuration({
        title,
        description,
        contents: contentId,
        thumbnail: thumbnailUrl,
      });
    }
  };

  return { handleSubmit };
};

export default useCurationSubmit;
