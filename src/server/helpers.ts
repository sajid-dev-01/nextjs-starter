import crypto from "crypto";

import "server-only";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_URI, SESSION_COOKIE } from "~/features/auth/constants";
import { removeSlashs } from "~/lib/helpers";

import { auth } from "./lib/auth";

export async function checkAuth() {
  const authn = await auth.api.getSession({ headers: await headers() });
  if (!authn?.user) {
    const cs = await cookies();
    cs.delete(SESSION_COOKIE);
    return redirect(AUTH_URI.signIn);
  }
  return authn;
}

export function absoluteUrl(path: string) {
  return `localhost:3000/${removeSlashs(path)}`;
}

export function createRandomString(length: number) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const randomArray = new Uint8Array(length);
  crypto.getRandomValues(randomArray);
  randomArray.forEach((number) => {
    result += chars[number % chars.length];
  });
  return result;
}

export async function generateRandomString(length: number) {
  const buf = await new Promise<Buffer>((resolve, reject) => {
    crypto.randomBytes(Math.ceil(length / 2), (err, buf) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(buf);
      }
    });
  });

  return buf.toString("hex").slice(0, length);
}
