"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import React, { type PropsWithChildren } from "react";

import { queryClient } from "~/lib/query-client";
import { TRPCReactProvider } from "~/trpc/react";

import { Toaster } from "./ui/sonner";
import { AlertDialogProvider } from "./ui-ext/alert";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <NuqsAdapter>
      <ThemeProvider attribute="class" defaultTheme="system">
        <TRPCReactProvider>
          <QueryClientProvider client={queryClient}>
            <AlertDialogProvider>{children}</AlertDialogProvider>
          </QueryClientProvider>
        </TRPCReactProvider>
      </ThemeProvider>
      <Toaster position="top-center" richColors duration={5000} closeButton />
    </NuqsAdapter>
  );
};
