"use client";

import { useSignup } from "~/features/auth/api/sign-up";
import { SignUpForm } from "~/features/auth/components/sign-up";
import { type SignUpPayload } from "~/features/auth/schemas";

export default function SignUpPage() {
  const { mutate, isPending } = useSignup();

  const handleSubmit = (data: SignUpPayload) => {
    mutate(data);
  };

  return <SignUpForm onSubmit={handleSubmit} isPending={isPending} />;
}
