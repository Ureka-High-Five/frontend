import { useMutation } from "@tanstack/react-query";
import patchContent from "@/apis/admin/patchContent";

const usePatchContent = () => {
  const patchContentMutation = useMutation({
    mutationFn: patchContent,
  });

  return {
    mutatePatchContent: patchContentMutation.mutate,
  };
};

export default usePatchContent;
