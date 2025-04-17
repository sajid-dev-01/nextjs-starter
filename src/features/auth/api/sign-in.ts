import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { authClient } from "~/lib/auth-client";

import { DEFAULT_LOGIN_REDIRECT } from "../constants";
import type { SignInPayload } from "../schemas";

export const useSignin = () => {
  const searchParams = useSearchParams();
  return useMutation({
    mutationFn: async (input: SignInPayload) => {
      const { data, error } = await authClient.signIn.email({
        email: input.email,
        password: input.password,
        rememberMe: false,
        callbackURL: searchParams.get("callback-url") ?? DEFAULT_LOGIN_REDIRECT,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Signin successfull!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
