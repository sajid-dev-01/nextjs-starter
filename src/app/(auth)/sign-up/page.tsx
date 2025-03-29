"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { SignUpForm } from "~/features/auth/components/sign-up";
import { AUTH_URI } from "~/features/auth/constants";
import { SignUpPayload } from "~/features/auth/schemas";
import { authClient } from "~/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (data: SignUpPayload) => {
    await authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/",
      },
      {
        onRequest: () => setIsPending(true),
        onResponse: () => setIsPending(false),
        onSuccess: () => {
          router.push(AUTH_URI.verifyEmail);
        },
      }
    );
  };

  return <SignUpForm onSubmit={handleSubmit} isPending={isPending} />;
}
