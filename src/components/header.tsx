"use client";

import Link from "next/link";
import { useState } from "react";

import { ThemeSwitcher } from "~/components/theme-switcher";
import { Button } from "~/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { AUTH_URI } from "~/features/auth/constants";
import { authClient } from "~/lib/auth-client";

import { Logo } from "./logo";
import { UserMenu } from "./user-menu";

const navMenu = [
  { title: "Features", url: "#features" },
  { title: "Testimonials", url: "#testimonials" },
  { title: "Pricing", url: "#pricing" },
];

const Header = () => {
  const { data: auth } = authClient.useSession();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background sticky top-0 z-9 border-b">
      <div className="container mx-auto flex items-center py-3">
        <Button
          className="group md:hidden"
          variant="outline"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className="pointer-events-none"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12L20 12"
              className="origin-center -translate-y-[7px] transition-all duration-500 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
            />
            <path
              d="M4 12H20"
              className="origin-center transition-all duration-500 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
            />
            <path
              d="M4 12H20"
              className="origin-center translate-y-[7px] transition-all duration-500 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
            />
          </svg>
        </Button>

        <div className="mr-auto hidden items-center gap-3 md:flex">
          <Link className="items-center justify-center" href="/">
            <Logo />
            <span className="sr-only">Logo</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              {navMenu.map((menu) => (
                <NavigationMenuItem key={menu.title}>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    asChild
                  >
                    <Link href={menu.url}>{menu.title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="ml-auto flex gap-3 md:ml-0">
          <ThemeSwitcher />
          {auth?.user ? (
            // @ts-expect-error
            <UserMenu user={auth?.user} />
          ) : (
            <Button asChild>
              <Link href={AUTH_URI.signIn}> Sign in </Link>
            </Button>
          )}
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="border-t md:hidden">
          <nav className="bg-background flex flex-col items-center py-4">
            {navMenu.map((menu) => (
              <Link key={menu.title} className="px-4 py-2" href={menu.url}>
                {menu.title}
              </Link>
            ))}
            {!auth?.user && (
              <Link className="px-4 py-2" href={AUTH_URI.signIn}>
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
