import getContentPresignedUrl from "@lead-me/api/getContentPresignedUrl";
import putFileUpload from "@lead-me/api/putFileUpload";
import { toast } from "sonner";

interface UploadContentFiles {
  imageFile: File;
  shortsFile: File;
  videoFile: File;
}

const useContentFileUpload = () => {
  const uploadContentFile = async ({
    imageFile,
    shortsFile,
    videoFile,
  }: UploadContentFiles) => {
    try {
      const upload = await getContentPresignedUrl();

      await Promise.all([
        putFileUpload({
          presignedUrl: upload.imagePresignedUrl,
          file: imageFile,
        }),
        putFileUpload({
          presignedUrl: upload.shortsPresignedUrl,
          file: shortsFile,
        }),
        putFileUpload({
          presignedUrl: upload.videoPresignedUrl,
          file: videoFile,
        }),
      ]);

      return {
        imageUrl: upload.imageUrl,
        shortsUrl: upload.shortsUrl,
        videoUrl: upload.videoUrl,
        uuid: upload.uuid,
      };
    } catch {
      toast.error("파일 업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.");
      return null;
    }
  };

  return { uploadContentFile };
};

export default useContentFileUpload;
