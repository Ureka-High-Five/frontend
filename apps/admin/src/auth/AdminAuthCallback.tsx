import { useEffect, useRef, useState } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@lead-me/api/constants";
import postKakaoLogin from "@lead-me/api/postKakaoLogin";
import { Button } from "@lead-me/ui/button";
import { Loader2 } from "lucide-react";

interface AdminAuthCallbackProps {
  onAuthenticated: () => void;
}

const AdminAuthCallback = ({ onAuthenticated }: AdminAuthCallbackProps) => {
  const requestedRef = useRef(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (requestedRef.current) return;
    requestedRef.current = true;

    const code = new URLSearchParams(window.location.search).get("code");

    if (!code) {
      setErrorMessage("카카오 인증 코드가 없습니다. 다시 로그인해 주세요.");
      return;
    }

    const authenticate = async () => {
      try {
        const result = await postKakaoLogin(code);

        if (result.isNew) {
          setErrorMessage("관리자로 등록된 기존 계정만 접근할 수 있습니다.");
          return;
        }

        sessionStorage.setItem(ACCESS_TOKEN, result.accessToken);
        sessionStorage.setItem(REFRESH_TOKEN, result.refreshToken);
        window.history.replaceState({}, "", "/");
        onAuthenticated();
      } catch {
        setErrorMessage(
          "카카오 로그인에 실패했습니다. 서버와 환경변수를 확인해 주세요."
        );
      }
    };

    authenticate();
  }, [onAuthenticated]);

  if (errorMessage) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6 text-center">
        <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-bold text-gray-900">로그인 실패</h1>
          <p className="mt-3 text-sm leading-6 text-gray-500">{errorMessage}</p>
          <Button
            className="mt-6 w-full"
            onClick={() => window.location.replace("/")}>
            로그인 화면으로 돌아가기
          </Button>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center text-gray-700">
        <Loader2 aria-hidden="true" className="h-8 w-8 animate-spin" />
        <p className="mt-3">관리자 계정을 확인하고 있습니다.</p>
      </div>
    </main>
  );
};

export default AdminAuthCallback;
