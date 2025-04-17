import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authClient } from "~/lib/auth-client";

import { AUTH_URI } from "../constants";
import type { SignUpPayload } from "../schemas";

export const useSignup = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (input: SignUpPayload) => {
      const { data, error } = await authClient.signUp.email({
        name: input.name,
        email: input.email,
        password: input.password,
        // callbackURL: "/",
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Signup successfull!");
      router.push(AUTH_URI.verifyEmail);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
