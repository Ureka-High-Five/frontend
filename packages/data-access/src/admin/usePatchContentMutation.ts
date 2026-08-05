import patchContent from "@lead-me/api/admin/patchContent";
import { useMutation } from "@tanstack/react-query";

const usePatchContent = () => {
  const { mutate: mutatePatchContent } = useMutation({
    mutationFn: patchContent,
  });

  return {
    mutatePatchContent,
  };
};

export default usePatchContent;
