import { env } from "./env";

const currentYear = new Date().getFullYear().toString();
const websiteLaunchYear = "2025";

export const siteConfig = {
  name: env.NEXT_PUBLIC_APP_NAME,
  url: env.NEXT_PUBLIC_APP_URL,
  locale: "en-US",
  language: "en-us",
  description: "A simple next.js starter template",
  source: {
    github: "https://github.com/sajid-dev-01/next-starter.git",
  },
  companyName: env.NEXT_PUBLIC_COMPANY_NAME,
  companyAddr: "123 Main St, Anytown, ST 12345",
  copywriteYears:
    currentYear === websiteLaunchYear
      ? currentYear
      : `${websiteLaunchYear}-${currentYear}`,
  author: {
    github: "https://github.com/sajid-dev-01",
    twitter: "@sajidctg1",
  },
};
