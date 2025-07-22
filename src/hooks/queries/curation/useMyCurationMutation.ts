import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteMyCuration from "@/apis/my/deleteMyCuration";

const useMyCurationMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: mutateDeleteMyCuration } = useMutation({
    mutationFn: (curationId: number) => deleteMyCuration(curationId),
    onSuccess: (_, curationId) => {
      queryClient.invalidateQueries({ queryKey: ["myCurations"] });
      queryClient.removeQueries({
        queryKey: ["curationDetail", curationId],
      });
    },
  });

  return {
    mutateDeleteMyCuration,
  };
};

export default useMyCurationMutation;
