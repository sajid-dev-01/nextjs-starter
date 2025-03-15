"use client";

import { useState } from "react";

import { ForgotPasswordForm } from "~/features/auth/components/forgot-password";
import { ForgotPasswordPayload } from "~/features/auth/schemas";
import { authClient } from "~/lib/auth-client";

export default function ForgotPasswordPage() {
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (data: ForgotPasswordPayload) => {
    await authClient.emailOtp.sendVerificationOtp(
      {
        email: data.email,
        type: "forget-password",
      },
      {
        onRequest: () => setIsPending(true),
        onResponse: () => setIsPending(false),
      }
    );
  };
  return <ForgotPasswordForm onSubmit={handleSubmit} isPending={isPending} />;
}
