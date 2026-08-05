import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { queryClient } from "@lead-me/data-access/common/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./router/AppRouter";
import "@lead-me/ui/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  </StrictMode>
);
