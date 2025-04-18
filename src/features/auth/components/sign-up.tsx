"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { GenericForm } from "~/components/form/generic-form";
import { GenericInput } from "~/components/form/generic-input";
import { ButtonLoading } from "~/components/ui-ext/button-loading";
import { siteConfig } from "~/site-config";

import { useSignup } from "../api/sign-up";
import { AUTH_URI } from "../constants";
import { type SignUpPayload, SignUpSchema } from "../schemas";
import AuthCard from "./auth-card";

export const SignUpForm = () => {
  const { mutate, isPending } = useSignup();

  const form = useForm<SignUpPayload>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "Sajid",
      email: "test@test.com",
      password: "12345678",
    },
  });

  const handleSubmit = (data: SignUpPayload) => {
    mutate(data);
  };

  return (
    <AuthCard
      headerTitle={`Register to ${siteConfig.name}`}
      headerDesc="Choose your preferred sign up method"
      buttonLabel="Already have an account?"
      buttonHref={AUTH_URI.signIn}
      showSocial
    >
      <GenericForm {...form} onSubmit={handleSubmit}>
        <div className="space-y-4">
          <GenericInput
            form={form}
            isPending={isPending}
            name="name"
            placeholder="Jhon Doe"
          />
          <GenericInput
            form={form}
            isPending={isPending}
            name="email"
            type="email"
            placeholder="jhon@example.com"
          />
          <GenericInput
            form={form}
            isPending={isPending}
            name="password"
            type="password"
          />
        </div>
        <ButtonLoading type="submit" loading={isPending} className="w-full">
          Register
        </ButtonLoading>
      </GenericForm>
    </AuthCard>
  );
};
