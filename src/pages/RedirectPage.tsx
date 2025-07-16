import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import useKakaoLoginMutation from "@/hooks/queries/auth/useKakaoLoginMutation";

const RedirectPage = () => {
  const { mutatePostKakaoLogin } = useKakaoLoginMutation();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    if (code) {
      mutatePostKakaoLogin(code);
    }
  }, [location.search, mutatePostKakaoLogin]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center">
        <Loader2 className="h-10 w-10 animate-spin text-custom-point mb-4" />
        <p className="mb-1 heading-h1-dohyeon text-white">
          카카오 계정으로 로그인 중입니다
        </p>
        <p className="body-md-dohyeon text-custom-gray">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
};

export default RedirectPage;
