import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { authClient } from "~/lib/auth-client";
import { getQueryClient } from "~/trpc/react";

interface Input {
  token: string;
  password?: string;
}

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: async ({ token, password }: Input) => {
      const { data, error } = await authClient.deleteUser({ token, password });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Account deleted successfully");
      getQueryClient().invalidateQueries({ queryKey: ["sessions"] });
    },
  });
};
