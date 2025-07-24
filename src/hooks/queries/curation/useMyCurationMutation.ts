import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteMyCuration from "@/apis/my/curation/deleteMyCuration";
import { makeToast } from "@/utils/makeToast";

const useMyCurationMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: mutateDeleteMyCuration } = useMutation({
    mutationFn: (curationId: number) => deleteMyCuration(curationId),
    onSuccess: (_, curationId) => {
      queryClient.invalidateQueries({ queryKey: ["myCurations"] });
      queryClient.removeQueries({
        queryKey: ["curationDetail", curationId],
      });
      makeToast("큐레이션 삭제 성공", "success");
    },
  });

  return {
    mutateDeleteMyCuration,
  };
};

export default useMyCurationMutation;
