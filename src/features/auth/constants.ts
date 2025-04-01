export const SESSION_COOKIE = "session";
export const UNVERIFIED_EMAIL_COOKIE = "unverified";

export const DEFAULT_LOGIN_REDIRECT = "/";

export const AUTH_URI = {
  signIn: "/sign-in",
  signUp: "/sign-up",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  verifyEmail: "/verify-email",
} as const;
