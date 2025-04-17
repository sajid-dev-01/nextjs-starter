import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { authClient } from "~/lib/auth-client";

import type { ForgotPasswordPayload } from "../schemas";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (input: ForgotPasswordPayload) => {
      const { data, error } = await authClient.emailOtp.sendVerificationOtp({
        email: input.email,
        type: "forget-password",
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Reset password email sent!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
