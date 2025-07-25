import { useMutation } from "@tanstack/react-query";
import putFileUpload from "@/apis/common/putFileUpload";

const useFileUploadMutation = () => {
  const { mutateAsync: mutateFileUpload } = useMutation({
    mutationFn: putFileUpload,
  });

  return {
    mutateFileUpload,
  };
};

export default useFileUploadMutation;
