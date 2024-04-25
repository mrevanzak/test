"use client";

import * as React from "react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { ZodError } from "zod";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Provider({ children }: ProvidersProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
        queryCache: new QueryCache({
          onError: (err) => {
            if (err instanceof ZodError) {
              err.issues.map((issue) =>
                toast.error(`${issue.path.toString()}: ${issue.message}`),
              );
              return;
            }

            toast.error(err.message);
          },
        }),
        mutationCache: new MutationCache({
          onError: (err) => {
            toast.error(err.message);
          },
        }),
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
