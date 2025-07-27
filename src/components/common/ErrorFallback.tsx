import { useNavigate } from "react-router-dom";
import { HTTPError } from "@/apis/HTTPError";
import { Button } from "@/components/ui/button";
import { PATH } from "@/constants/path";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  const navigate = useNavigate();

  const getMessage = (err: Error) => {
    if (err instanceof HTTPError) {
      switch (err.status) {
        case 404:
          return "리소스를 찾을 수 없습니다.";
        case 500:
          return "서버 오류가 발생했습니다.";
        default:
          return `${err.status}: 알 수 없는 오류입니다.`;
      }
    }

    return err.message || "예상치 못한 오류가 발생했습니다.";
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full w-full text-center p-6">
      <h1 className="text-3xl font-bold text-custom-point">
        문제가 발생했어요
      </h1>
      <p className="text-muted-foreground text-sm">{getMessage(error)}</p>
      <div className="flex gap-3 mt-4">
        <Button onClick={resetErrorBoundary}>다시 시도</Button>
        <Button
          onClick={() => navigate(PATH.HOME)}
          className="bg-custom-point text-custom-black">
          홈으로
        </Button>
      </div>
    </div>
  );
};

export default ErrorFallback;
