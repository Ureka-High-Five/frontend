import deleteContent from "@lead-me/api/admin/deleteContent";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteContentMutation = (searchValue: string) => {
  const queryClient = useQueryClient();

  const { mutate: mutateDeleteContent } = useMutation({
    mutationFn: deleteContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["search", searchValue] });
    },
  });

  return { mutateDeleteContent };
};

export default useDeleteContentMutation;
