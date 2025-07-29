import getPresignedUrl from "@/apis/common/getPresignedUrl";
import useFileUploadMutation from "@/hooks/queries/common/useFileUploadMutation";
import { makeToast } from "@/utils/makeToast";

const useFileUpload = () => {
  const { mutateFileUpload } = useFileUploadMutation();

  const uploadFile = async (file: File, type: string) => {
    try {
      const { presignedUrl, imageUrl } = await getPresignedUrl(type);
      await mutateFileUpload({ presignedUrl, file });

      return imageUrl;
    } catch (error) {
      makeToast(
        "큐레이션 썸네일 이미지를 만드는 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.",
        "warning"
      );

      return null;
    }
  };

  return {
    uploadFile,
  };
};

export default useFileUpload;
