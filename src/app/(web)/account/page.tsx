import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Heading } from "~/components/ui-ext/heading";
import { AUTH_URI } from "~/features/auth/constants";
import SettingTabs from "~/features/settings/components/setting-tabs";
import { auth } from "~/server/lib/auth";

export default async function AccountPage() {
  const [headerList, authenticate] = await Promise.all([
    headers(),
    auth.api.getSession({ headers: await headers() }),
  ]);

  if (!authenticate) return redirect(AUTH_URI.signIn);

  //if (
  //  auth.user.password &&
  //  (!auth.session.passwordConfirmedAt ||
  //    auth.session.passwordConfirmedAt.getTime() + 1000 * 60 * 60 < Date.now())
  //) {
  //  return redirect(
  //    `${CONFIRM_PASSWORD_PAGE}?callback-url=${headerList.get("x-current-path")}`
  //  );
  //}

  return (
    <div className="container mx-auto">
      <Heading>Account</Heading>
      <p className="text-muted-foreground text-sm font-semibold">
        Manage your account settings and set e-mail preferences.
      </p>
      <br />
      <SettingTabs />
    </div>
  );
}
