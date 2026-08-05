import { useMutation, useQueryClient } from "@tanstack/react-query";
import postMyCuration from "@/apis/my/curation/postMyCuration";
import { makeToast } from "@/utils/makeToast";

const useCreateCurationMutation = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  const { mutate: mutateCreateMyCuration } = useMutation({
    mutationFn: postMyCuration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myCurations"] });
      makeToast("큐레이션 생성 성공", "success");
      onSuccessCallback();
    },
    onError: () => {
      makeToast(
        "큐레이션 생성에 실패했어요. 잠시 후 다시 시도해 주세요.",
        "warning"
      );
    },
  });

  return {
    mutateCreateMyCuration,
  };
};

export default useCreateCurationMutation;
