import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { queryClient } from "@lead-me/data-access/common/queryClient";
import { Toaster } from "@lead-me/ui/sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import AdminApp from "@/AdminApp";
import { ApiUnavailable } from "@/AppFallbacks";
import "@lead-me/ui/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={<ApiUnavailable />}>
        <AdminApp />
      </ErrorBoundary>
      <Toaster />
    </QueryClientProvider>
  </StrictMode>
);
