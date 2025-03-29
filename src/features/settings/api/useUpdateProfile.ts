import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { authClient } from "~/lib/auth-client";

interface Input {
  name: string;
  image?: string;
}

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async ({ name, image }: Input) => {
      const { data, error } = await authClient.updateUser({
        name,
        image,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Profile updated!");
    },
  });
};
