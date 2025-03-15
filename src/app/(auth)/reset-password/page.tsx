"use client";

import { useState } from "react";

import { ResetPasswordForm } from "~/features/auth/components/reset-password";
import { ResetPasswordPayload } from "~/features/auth/schemas";
import { authClient } from "~/lib/auth-client";

export default function ResetPasswordPage() {
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (data: ResetPasswordPayload) => {
    await authClient.emailOtp.resetPassword(
      {
        email: data.email,
        otp: data.otp,
        password: data.password,
      },
      {
        onRequest: () => setIsPending(true),
        onResponse: () => setIsPending(false),
      }
    );
  };
  return (
    <ResetPasswordForm
      email="test@test.com"
      onSubmit={handleSubmit}
      isPending={isPending}
    />
  );
}
