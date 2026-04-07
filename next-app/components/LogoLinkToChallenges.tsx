"use client";

import Link from "next/link";

type Props = {
  variant: "navbar" | "footer";
};

/**
 * Link to /challenges: prefetch disabled so stale unauthenticated RSC payloads
 * are not reused after login.
 */
export function LogoLinkToChallenges({ variant }: Props) {
  const linkClass =
    variant === "navbar"
      ? "flex items-center gap-2 text-base font-semibold tracking-tight text-fg focus-visible:outline-none"
      : "inline-flex items-center gap-2 justify-center opacity-90 transition hover:opacity-100 focus-visible:outline-none";

  const iconSize = variant === "navbar" ? "h-7 w-7" : "h-6 w-6";
  const textSize = variant === "navbar" ? "text-base sm:text-lg" : "text-sm sm:text-base";

  return (
    <Link href="/challenges" prefetch={false} className={linkClass}>
      {/* Code brackets icon */}
      <svg
        viewBox="0 0 28 28"
        className={`${iconSize} shrink-0 text-brand-accent`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 8L4 14l5 6" />
        <path d="M19 8l5 6-5 6" />
        <path d="M16 5l-4 18" />
      </svg>
      <span className={textSize}>
        <span className="font-bold text-fg">NovaBuild</span>
        <span className="font-medium text-brand-accent"> Web Studio</span>
      </span>
    </Link>
  );
}
