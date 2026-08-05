import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@lead-me/api/constants";
import postKakaoLogin from "@lead-me/api/postKakaoLogin";
import { useMutation } from "@tanstack/react-query";
import { PATH } from "@/constants/path";
import useUserStore from "@/stores/useUserStore";

const useKakaoLoginMutation = () => {
  const navigate = useNavigate();
  const { setUserId, setName } = useUserStore.getState();

  const postKakaoLoginMutation = useMutation({
    mutationFn: postKakaoLogin,
    onSuccess: (content) => {
      if (content.isNew) {
        setUserId(content.userId);
        setName(content.nickname);

        navigate(PATH.ONBOARDING);
      } else {
        sessionStorage.setItem(ACCESS_TOKEN, content.accessToken);
        sessionStorage.setItem(REFRESH_TOKEN, content.refreshToken);

        navigate(PATH.HOME);
      }
    },
  });

  return { mutatePostKakaoLogin: postKakaoLoginMutation.mutate };
};

export default useKakaoLoginMutation;
