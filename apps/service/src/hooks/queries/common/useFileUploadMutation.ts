import putFileUpload from "@lead-me/api/putFileUpload";
import { useMutation } from "@tanstack/react-query";

const useFileUploadMutation = () => {
  const { mutateAsync: mutateFileUpload } = useMutation({
    mutationFn: putFileUpload,
  });

  return {
    mutateFileUpload,
  };
};

export default useFileUploadMutation;
