import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { VerifyEmailForm } from "~/features/auth/components/verify-email";
import { AUTH_URI, UNVERIFIED_EMAIL_COOKIE } from "~/features/auth/constants";

export const metadata = {
  title: "Verify email",
};

export default async function VerifyEmailPage() {
  const cookie = await cookies();
  const email = cookie.get(UNVERIFIED_EMAIL_COOKIE)?.value;
  if (!email) return redirect(AUTH_URI.signUp);

  return <VerifyEmailForm email={email} />;
}
