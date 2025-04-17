"use client";

import { useResetPassword } from "~/features/auth/api/reset-password";
import { ResetPasswordForm } from "~/features/auth/components/reset-password";
import { type ResetPasswordPayload } from "~/features/auth/schemas";

export default function ResetPasswordPage() {
  const { mutate, isPending } = useResetPassword();

  const handleSubmit = (data: ResetPasswordPayload) => {
    mutate(data);
  };

  return (
    <ResetPasswordForm
      email="test@test.com"
      onSubmit={handleSubmit}
      isPending={isPending}
    />
  );
}
