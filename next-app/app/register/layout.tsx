import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_NAME, defaultOpenGraph, defaultTwitter, robotsPrivate } from "@/lib/seo";

const title = "Create account";
const desc = "Create a free account to access Web Technologies challenges, modules, and track your learning progress.";

export const metadata: Metadata = {
  title,
  description: desc,
  robots: robotsPrivate,
  openGraph: defaultOpenGraph({
    title: `${title} | ${SITE_NAME}`,
    description: desc,
    path: "/register"
  }),
  twitter: defaultTwitter({ title: `${title} | ${SITE_NAME}`, description: desc }),
  alternates: { canonical: "/register" }
};

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return children;
}
