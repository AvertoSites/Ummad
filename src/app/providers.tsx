import type { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/query-client";
import { SubmissionsProvider } from "../features/submit/SubmissionsContext";
import { BilingualToast } from "./BilingualToast";
import { usePageTracking } from "../lib/analytics";
import "../i18n";
import "react-toastify/dist/ReactToastify.css";

/** Mounts page-view tracking inside BrowserRouter so it has router context */
function PageTracker() {
  usePageTracking();
  return null;
}

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <SubmissionsProvider>
        <BrowserRouter>
          <PageTracker />
          {children}
          <BilingualToast />
        </BrowserRouter>
      </SubmissionsProvider>
    </QueryClientProvider>
  );
}
