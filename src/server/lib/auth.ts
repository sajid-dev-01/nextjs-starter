import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, createAuthMiddleware, emailOTP } from "better-auth/plugins";

import VerifyOTPEmail from "~/emails/verify-otp";
import { env } from "~/env";
import { AUTH_URI, UNVERIFIED_EMAIL_COOKIE } from "~/features/auth/constants";
import { siteConfig } from "~/site-config";

import { authConfig } from "../configs/auth-config";
import { db } from "../db/drizzle";
import { sendEmail } from "./email-sender";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "sqlite", usePlural: true }),
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith(AUTH_URI.signUp)) {
        ctx.setCookie(UNVERIFIED_EMAIL_COOKIE, ctx.body.email);
      }
    }),
  },
  advanced: {
    useSecureCookies: env.NODE_ENV === "production",
  },
  emailAndPassword: {
    enabled: authConfig.email.enabled,
    requireEmailVerification: authConfig.email.requiredVerification,
  },
  socialProviders: {
    google: {
      enabled: authConfig.google.enabled,
      clientId: authConfig.google.clientId,
      clientSecret: authConfig.google.secret,
    },
    github: {
      enabled: authConfig.github.enabled,
      clientId: authConfig.github.clientId,
      clientSecret: authConfig.github.secret,
    },
  },
  plugins: [
    emailOTP({
      sendVerificationOnSignUp: true,
      disableSignUp: true,
      async sendVerificationOTP({ email, otp, type }) {
        console.log({ otp });
        if (type === "email-verification" || type === "forget-password") {
          await sendEmail(
            email,
            `Verify your email for ${siteConfig.name}`,
            VerifyOTPEmail({
              code: otp,
              appUrl: siteConfig.url,
              appName: siteConfig.name,
              expiration: authConfig.email.confirmationExpires,
              companyName: siteConfig.companyName,
              companyAddr: siteConfig.companyAddr,
            })
          );
        }
      },
    }),
    admin(),
  ],
});
