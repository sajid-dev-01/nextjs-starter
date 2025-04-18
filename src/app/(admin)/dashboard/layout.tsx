import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { KBar } from "~/components/dashboard/kbar";
import { AppSidebar } from "~/components/dashboard/sidebar/app-sidebar";
import SearchInput from "~/components/dashboard/sidebar/search-input";
import { ThemeToggle } from "~/components/theme-toggle";
import { Separator } from "~/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { UserMenu } from "~/components/user-menu";
import { AUTH_URI } from "~/features/auth/constants";
import { constructMetadata } from "~/lib/construct-metadata";
import { auth } from "~/server/lib/auth";

export const metadata = constructMetadata({ title: "Dashboard" });

type Props = {
  children: React.ReactNode;
};

export default async function DashboardLayout({ children }: Props) {
  const authn = await auth.api.getSession({ headers: await headers() });
  if (!authn?.user) return redirect(AUTH_URI.signIn);

  return (
    <KBar>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="bg-sidebar flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="inline-flex w-full items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <div className="mr-auto inline-flex items-center gap-2">
                <SearchInput />
              </div>
              <ThemeToggle />
              {/* @ts-expect-error */}
              <UserMenu user={authn.user} />
            </div>
          </header>
          <div className="mt-4 px-4"> {children} </div>
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
