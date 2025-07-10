import { useEffect } from "react";
import useKakaoLoginMutation from "@/hooks/queries/auth/useKakaoLoginMutation";

const RedirectPage = () => {
  const { mutatePostKakaoLogin } = useKakaoLoginMutation();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if (code) {
      mutatePostKakaoLogin(code);
    }
  }, [mutatePostKakaoLogin]);

  return <div>로딩 중</div>;
};

export default RedirectPage;
