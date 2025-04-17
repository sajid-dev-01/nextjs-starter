import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { GenericForm } from "~/components/form/generic-form";
import { GenericInput } from "~/components/form/generic-input";
import { Button } from "~/components/ui/button";
import { ButtonLoading } from "~/components/ui-ext/button-loading";
import { siteConfig } from "~/site-config";

import { AUTH_URI } from "../constants";
import { type SignInPayload, SignInSchema } from "../schemas";
import AuthCard from "./auth-card";

interface Props {
  onSubmit: (data: SignInPayload) => void;
  isPending?: boolean;
}

export const SignInForm = ({ onSubmit, isPending = false }: Props) => {
  const form = useForm<SignInPayload>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "test@test.com",
      password: "12345678",
    },
  });

  return (
    <AuthCard
      headerTitle={`Login to ${siteConfig.name}`}
      headerDesc="Choose your preferred sign in method"
      buttonLabel="Don't have an account?"
      buttonHref={AUTH_URI.signUp}
      showSocial
    >
      <GenericForm {...form} onSubmit={onSubmit}>
        <div className="space-y-4">
          <GenericInput
            form={form}
            name="email"
            type="email"
            placeholder="jhon@example.com"
            isPending={isPending}
          />
          <GenericInput
            form={form}
            name="password"
            type="password"
            isPending={isPending}
          />
          <Button
            size="sm"
            variant="link"
            className="h-0 p-0 font-normal text-blue-500"
            asChild
          >
            <Link href={AUTH_URI.forgotPassword}>Forgot password?</Link>
          </Button>
        </div>
        <ButtonLoading type="submit" loading={isPending} className="w-full">
          Login
        </ButtonLoading>
      </GenericForm>
    </AuthCard>
  );
};
