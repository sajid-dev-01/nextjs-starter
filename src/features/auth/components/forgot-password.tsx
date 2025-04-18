"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { GenericForm } from "~/components/form/generic-form";
import { GenericInput } from "~/components/form/generic-input";
import { ButtonLoading } from "~/components/ui-ext/button-loading";

import { useForgotPassword } from "../api/forgot-password";
import { AUTH_URI } from "../constants";
import { type ForgotPasswordPayload, ForgotPasswordSchema } from "../schemas";
import AuthCard from "./auth-card";

export const ForgotPasswordForm = () => {
  const { mutate, isPending } = useForgotPassword();

  const form = useForm<ForgotPasswordPayload>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "test@test.com",
    },
  });

  const handleSubmit = (data: ForgotPasswordPayload) => {
    mutate(data);
  };

  return (
    <AuthCard
      headerTitle="Forgot your password?"
      buttonLabel="Back to login"
      buttonHref={AUTH_URI.signIn}
    >
      <GenericForm {...form} onSubmit={handleSubmit}>
        <div className="space-y-4">
          <GenericInput
            form={form}
            isPending={isPending}
            name="email"
            type="email"
            placeholder="jhon@example.com"
          />
        </div>
        <ButtonLoading type="submit" loading={isPending} className="w-full">
          Send reset link
        </ButtonLoading>
      </GenericForm>
    </AuthCard>
  );
};
