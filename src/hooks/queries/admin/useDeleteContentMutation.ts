import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteContent from "@/apis/admin/deleteContent";

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
