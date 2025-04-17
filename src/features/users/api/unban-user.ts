import { useMutation } from "@tanstack/react-query";

import { authClient } from "~/lib/auth-client";
import { api } from "~/trpc/react";

export const useUnbanUser = () => {
  const utils = api.useUtils();

  return useMutation({
    mutationFn: async (input: { userId: string }) => {
      const { data, error } = await authClient.admin.unbanUser({
        userId: input.userId,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      utils.user.list.invalidate();
    },
  });
};
