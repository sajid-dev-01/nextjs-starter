import "server-only";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_URI, SESSION_COOKIE } from "~/features/auth/constants";

import { auth } from "./auth";

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

export async function authenticate() {
  const authn = await auth.api.getSession({ headers: await headers() });
  if (!authn?.user) {
    const cs = await cookies();
    cs.delete(SESSION_COOKIE);
    return redirect(AUTH_URI.signIn);
  }
  return authn;
}
