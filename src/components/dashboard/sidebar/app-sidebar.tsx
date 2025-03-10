"use client";

import { GalleryVerticalEnd, LucideIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar";
import { Heading } from "~/components/ui-ext/heading";

import { NavMain } from "./nav-main";

interface NavItem {
  title: string;
  icon: LucideIcon;
  url: string;
  isActive: boolean;
}

interface NavItemWithSub {
  title: string;
  icon: LucideIcon;
  isActive: boolean;
  items: {
    title: string;
    url: string;
    isActive: boolean;
  }[];
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const navMain: (NavItem | NavItemWithSub)[] = [
    {
      title: "Settings",
      icon: SettingsIcon,
      url: "/dashboard/settings",
      isActive: pathname == "/dashboard/settings",
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link
          href={"/dashboard"}
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex gap-2"
        >
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <Heading> Acme Inc </Heading>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter> </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
