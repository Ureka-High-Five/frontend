import { useMutation } from "@tanstack/react-query";
import patchContent from "@/apis/admin/patchContent";

const usePatchContent = () => {
  const { mutate: mutatePatchContent } = useMutation({
    mutationFn: patchContent,
  });

  return {
    mutatePatchContent,
  };
};

export default usePatchContent;
