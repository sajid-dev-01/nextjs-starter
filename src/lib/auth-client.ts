import { adminClient, emailOTPClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";

import { siteConfig } from "~/site-config";

export const authClient = createAuthClient({
  baseURL: siteConfig.url,
  plugins: [emailOTPClient(), adminClient()],
  fetchOptions: {
    onError: (ctx) => {
      toast.error(ctx.error.message);
    },
  },
});
