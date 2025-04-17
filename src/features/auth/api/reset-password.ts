import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { authClient } from "~/lib/auth-client";

import type { ResetPasswordPayload } from "../schemas";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (input: ResetPasswordPayload) => {
      const { data, error } = await authClient.emailOtp.resetPassword({
        otp: input.otp,
        email: input.email,
        password: input.password,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Password updated!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
