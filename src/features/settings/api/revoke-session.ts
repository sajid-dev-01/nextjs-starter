import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { authClient } from "~/lib/auth-client";
import { getQueryClient } from "~/trpc/react";

interface Input {
  token: string;
}

export const useRevokeSession = () => {
  return useMutation({
    mutationFn: async ({ token }: Input) => {
      const { data, error } = await authClient.revokeSession({ token });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Session terminated successfully");
      getQueryClient().invalidateQueries({ queryKey: ["sessions"] });
    },
  });
};
