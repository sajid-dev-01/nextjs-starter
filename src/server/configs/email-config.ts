import { env } from "~/env";

export const emailConfig = {
  supportMailAddress: env.SUPPORT_MAIL_ADDRESS,
  mailFrom: env.MAIL_FROM_ADDRESS,
  mailFromName: env.MAIL_FROM_NAME,
  resendApiKey: env.RESEND_API_KEY,
};
