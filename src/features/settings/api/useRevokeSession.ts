import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { authClient } from "~/lib/auth-client";
import { queryClient } from "~/lib/query-client";

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
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
};
