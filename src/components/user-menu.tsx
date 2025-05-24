"use client";

import {
  BadgeCheckIcon,
  BellIcon,
  CircleUserIcon,
  CogIcon,
  LogOutIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { AVATAR_PLACEHOLDER } from "~/constants";
import { AUTH_URI } from "~/features/auth/constants";
import { authClient } from "~/lib/auth-client";

export const UserMenu = () => {
  const router = useRouter();
  const { data } = authClient.useSession();
  const user = data?.user;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess() {
          router.push(AUTH_URI.signIn);
        },
      },
    });
  };

  if (!user) {
    return (
      <Button size="sm" asChild>
        <Link href={AUTH_URI.signIn}>
          Sign In
          <span className="sr-only">Sign In</span>
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <Avatar className="size-9">
            <AvatarImage src={user.image ?? AVATAR_PLACEHOLDER} />
            <AvatarFallback className="">
              <CircleUserIcon />
            </AvatarFallback>
          </Avatar>
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56" align="end">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="size-8 rounded-lg">
              <AvatarImage
                src={user.image ?? AVATAR_PLACEHOLDER}
                alt={user.name}
              />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/dashboard">
            <CogIcon /> Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/account">
            <BadgeCheckIcon /> Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/dashboard">
            <BellIcon /> Notifications
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive cursor-pointer"
          onClick={handleSignOut}
        >
          <LogOutIcon /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
