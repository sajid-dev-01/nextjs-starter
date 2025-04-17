import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { GenericForm } from "~/components/form/generic-form";
import { GenericInput } from "~/components/form/generic-input";
import { ButtonLoading } from "~/components/ui-ext/button-loading";

import { AUTH_URI } from "../constants";
import { type ForgotPasswordPayload, ForgotPasswordSchema } from "../schemas";
import AuthCard from "./auth-card";

interface Props {
  onSubmit: (data: ForgotPasswordPayload) => void;
  isPending?: boolean;
}

export const ForgotPasswordForm = ({ onSubmit, isPending = false }: Props) => {
  const form = useForm<ForgotPasswordPayload>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "test@test.com",
    },
  });

  return (
    <AuthCard
      headerTitle="Forgot your password?"
      buttonLabel="Back to login"
      buttonHref={AUTH_URI.signIn}
    >
      <GenericForm {...form} onSubmit={onSubmit}>
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
