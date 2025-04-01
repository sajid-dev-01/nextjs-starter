"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { SignInForm } from "~/features/auth/components/sign-in";
import { DEFAULT_LOGIN_REDIRECT } from "~/features/auth/constants";
import { type SignInPayload } from "~/features/auth/schemas";
import { authClient } from "~/lib/auth-client";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (data: SignInPayload) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        rememberMe: false,
        callbackURL: searchParams.get("callback-url") ?? DEFAULT_LOGIN_REDIRECT,
      },
      {
        onRequest: () => setIsPending(true),
        onResponse: () => setIsPending(false),
      }
    );
  };

  return <SignInForm onSubmit={handleSubmit} isPending={isPending} />;
}
