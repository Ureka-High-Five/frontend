import { useNavigate } from "react-router-dom";
import { HTTPError } from "@/apis/HTTPError";
import { Button } from "@/components/ui/button";
import { HTTP_ERROR_MESSAGES } from "@/constants/api";
import { PATH } from "@/constants/path";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  const navigate = useNavigate();

  const getMessage = (err: Error): string => {
    if (err instanceof HTTPError) {
      const message =
        HTTP_ERROR_MESSAGES[err.status as keyof typeof HTTP_ERROR_MESSAGES];

      if (typeof message === "function") {
        return message(err.status);
      }

      return message ?? HTTP_ERROR_MESSAGES.DEFAULT(err.status);
    }

    return err.message || HTTP_ERROR_MESSAGES.UNKNOWN;
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
