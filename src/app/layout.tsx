import { Libre_Franklin, Roboto } from "next/font/google";
import { cookies } from "next/headers";

import { Providers } from "~/components/providers";
import { FONT_COOKIE_NAME } from "~/hooks/use-font";
import { constructMetadata } from "~/lib/construct-metadata";
import { cn } from "~/lib/utils";

import "../styles/globals.css";

// const geistSans = Geist({
//   subsets: ["latin"],
//   weight: ["300", "400", "700", "900"],
//   variable: "--font-geist-sans",
// });
//
// const geistMono = Geist_Mono({
//   subsets: ["latin"],
//   weight: ["300", "400", "700", "900"],
//   variable: "--font-geist-mono",
// });

const libre_franklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-libre_franklin",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-roboto",
});

export const metadata = constructMetadata({});

interface Props {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Props) {
  const [cookieList] = await Promise.all([cookies()]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "flex min-h-screen flex-col antialiased",
          // geistMono.variable,
          // geistSans.variable,
          libre_franklin.variable,
          roboto.variable,
          cookieList.get(FONT_COOKIE_NAME)?.value ?? "font-roboto"
        )}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
