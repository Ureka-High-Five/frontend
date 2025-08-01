import getContentPresignedUrl from "@/apis/common/getContentPresignedUrl";
import getCurationPresignedUrl from "@/apis/common/getCurationPresignedUrl";
import useFileUploadMutation from "@/hooks/queries/common/useFileUploadMutation";
import { makeToast } from "@/utils/makeToast";

interface UploadContentFiles {
  imageFile: File;
  shortsFile: File;
  videoFile: File;
}

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

  const uploadContentFile = async ({
    imageFile,
    shortsFile,
    videoFile,
  }: UploadContentFiles) => {
    try {
      const {
        imagePresignedUrl,
        imageUrl,
        shortsPresignedUrl,
        shortsUrl,
        videoPresignedUrl,
        videoUrl,
        uuid,
      } = await getContentPresignedUrl();
      await Promise.all([
        mutateFileUpload({ presignedUrl: imagePresignedUrl, file: imageFile }),
        mutateFileUpload({
          presignedUrl: shortsPresignedUrl,
          file: shortsFile,
        }),
        mutateFileUpload({ presignedUrl: videoPresignedUrl, file: videoFile }),
      ]);

      return {
        imageUrl,
        shortsUrl,
        videoUrl,
        uuid,
      };
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
    uploadContentFile,
  };
};

export default useFileUpload;
