import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { authClient } from "~/lib/auth-client";
import { queryClient } from "~/lib/query-client";

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
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
};
