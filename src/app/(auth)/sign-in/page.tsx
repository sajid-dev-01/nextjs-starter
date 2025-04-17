"use client";

import { useSignin } from "~/features/auth/api/sign-in";
import { SignInForm } from "~/features/auth/components/sign-in";
import { type SignInPayload } from "~/features/auth/schemas";

export default function SignInPage() {
  const { mutate, isPending } = useSignin();

  const handleSubmit = (data: SignInPayload) => {
    mutate(data);
  };

  return <SignInForm onSubmit={handleSubmit} isPending={isPending} />;
}
