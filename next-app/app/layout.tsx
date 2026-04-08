import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/Footer";
import { PostLoginWelcomeToast } from "@/components/PostLoginWelcomeToast";
import {
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  defaultOpenGraph,
  defaultTwitter,
  getSiteUrl,
  websiteJsonLd
} from "@/lib/seo";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08080c"
};

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: `${SITE_NAME} — Web Technologies Challenges`,
    template: `%s | ${SITE_NAME}`
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  keywords: [
    "HTML5",
    "CSS",
    "Web Technologies",
    "learn HTML",
    "learn CSS",
    "coding challenges",
    "responsive design",
    "Piston",
    "online coding"
  ],
  robots: { index: true, follow: true },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" }
    ],
    apple: "/apple-touch-icon.png"
  },
  alternates: {
    canonical: "/"
  },
  openGraph: defaultOpenGraph({
    title: `${SITE_NAME} — Web Technologies Challenges`,
    description: DEFAULT_DESCRIPTION,
    path: "/"
  }),
  twitter: defaultTwitter({
    title: `${SITE_NAME} — Web Technologies Challenges`,
    description: DEFAULT_DESCRIPTION
  })
};

/** Server-render HTML on each request (auth-aware layouts use cookies). */
export const dynamic = "force-dynamic";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <PostLoginWelcomeToast />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
