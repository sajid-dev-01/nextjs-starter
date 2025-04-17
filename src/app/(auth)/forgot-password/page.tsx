"use client";

import { useForgotPassword } from "~/features/auth/api/forgot-password";
import { ForgotPasswordForm } from "~/features/auth/components/forgot-password";
import { type ForgotPasswordPayload } from "~/features/auth/schemas";

export default function ForgotPasswordPage() {
  const { mutate, isPending } = useForgotPassword();

  const handleSubmit = (data: ForgotPasswordPayload) => {
    mutate(data);
  };

  return <ForgotPasswordForm onSubmit={handleSubmit} isPending={isPending} />;
}
