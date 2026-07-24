import type { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/query-client";
import { SubmissionsProvider } from "../features/submit/SubmissionsContext";
import { BilingualToast } from "./BilingualToast";
import "../i18n";
import "react-toastify/dist/ReactToastify.css";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <SubmissionsProvider>
        <BrowserRouter>
          {children}
          <BilingualToast />
        </BrowserRouter>
      </SubmissionsProvider>
    </QueryClientProvider>
  );
}
