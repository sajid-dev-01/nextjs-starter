import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { authClient } from "~/lib/auth-client";

import type { VerifyEmailPayload } from "../schemas";

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: async (input: VerifyEmailPayload & { email: string }) => {
      const { data, error } = await authClient.emailOtp.verifyEmail(input);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Email verified!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
