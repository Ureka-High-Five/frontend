import getCurationPresignedUrl from "@/apis/common/getCurationPresignedUrl";
import useFileUploadMutation from "@/hooks/queries/common/useFileUploadMutation";
import { makeToast } from "@/utils/makeToast";

const useFileUpload = () => {
  const { mutateFileUpload } = useFileUploadMutation();

  const uploadCurationFile = async (file: File) => {
    try {
      const { presignedUrl, imageUrl } = await getCurationPresignedUrl();
      await mutateFileUpload({ presignedUrl, file });

      return imageUrl;
    } catch (error) {
      makeToast(
        "파일 업로드 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.",
        "warning"
      );

      return null;
    }
  };

  return {
    uploadCurationFile,
  };
};

export default useFileUpload;
