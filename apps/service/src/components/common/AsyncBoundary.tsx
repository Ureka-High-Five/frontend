import React, { Suspense } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import ErrorFallback from "./ErrorFallback";

interface SuspenseErrorBoundaryProps {
  children: React.ReactNode;
  ErrorFallbackComponent?: React.ComponentType<{
    error: Error;
    resetErrorBoundary: () => void;
  }>;
  PendingFallbackComponent?: React.ReactNode;
}

function createFallbackRender(
  ErrorFallbackComponent?: SuspenseErrorBoundaryProps["ErrorFallbackComponent"]
) {
  return ({ error, resetErrorBoundary }: FallbackProps) =>
    ErrorFallbackComponent ? (
      <ErrorFallbackComponent
        error={error}
        resetErrorBoundary={resetErrorBoundary}
      />
    ) : (
      <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
    );
}

const AsyncBoundary = ({
  children,
  ErrorFallbackComponent,
  PendingFallbackComponent = (
    <div className="flex items-center justify-center w-full h-full p-8">
      <Loader2 className="h-10 w-10 animate-spin text-custom-point mb-4" />
    </div>
  ),
}: SuspenseErrorBoundaryProps) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={createFallbackRender(ErrorFallbackComponent)}>
          <Suspense fallback={PendingFallbackComponent}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default AsyncBoundary;
