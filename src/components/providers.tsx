"use client";

import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { type PropsWithChildren } from "react";

import { TRPCReactProvider } from "~/trpc/react";

import { Toaster } from "./ui/sonner";
import { AlertDialogProvider } from "./ui-ext/alert";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <NuqsAdapter>
      <ThemeProvider attribute="class" defaultTheme="system">
        <TRPCReactProvider>
          <AlertDialogProvider>{children}</AlertDialogProvider>
        </TRPCReactProvider>
      </ThemeProvider>
      <Toaster position="top-center" richColors duration={5000} closeButton />
    </NuqsAdapter>
  );
};
