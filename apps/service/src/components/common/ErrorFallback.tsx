import { useNavigate } from "react-router-dom";
import { HTTP_ERROR_MESSAGES } from "@lead-me/api/constants";
import { HTTPError } from "@lead-me/api/HTTPError";
import { Button } from "@lead-me/ui/button";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}
const shouldRetry = (err: Error): boolean => {
  if (err instanceof HTTPError) {
    const retryableStatuses = [500, 502, 503];
    return retryableStatuses.includes(err.status);
  }
  return false;
};

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

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  const navigate = useNavigate();
  const retryable = shouldRetry(error);

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full w-full text-center p-6">
      <h1 className="text-3xl font-bold text-custom-point">
        문제가 발생했어요
      </h1>
      <p className="text-muted-foreground text-sm whitespace-pre-line">
        {getMessage(error)}
      </p>

      <div className="flex gap-3 mt-4">
        {retryable && (
          <Button onClick={resetErrorBoundary} variant="outline">
            다시 시도
          </Button>
        )}
        <Button
          onClick={() => navigate(-1)}
          className="bg-custom-point text-custom-black">
          이전 페이지로
        </Button>
      </div>
    </div>
  );
};

export default ErrorFallback;
