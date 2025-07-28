import type { FallbackProps } from "react-error-boundary";
import { Button } from "@/components/ui/button";

export default function HomeErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full w-full text-center p-6">
      <h2 className="text-3xl font-bold text-custom-point">
        컨텐츠를 불러오지 못했습니다.
      </h2>
      <p className="text-muted-foreground text-sm">
        {error.message ?? "일시적인 문제가 발생했어요."}
      </p>
      <Button onClick={resetErrorBoundary}>다시 시도</Button>
    </div>
  );
}
