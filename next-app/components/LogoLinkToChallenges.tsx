"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logo-mikkaiser-coder.png";

type Props = {
  variant: "navbar" | "footer";
};

/**
 * Link to /challenges: prefetch disabled so stale unauthenticated RSC payloads
 * are not reused after login. Image uses pointer-events-none so clicks hit the Link.
 */
export function LogoLinkToChallenges({ variant }: Props) {
  const linkClass =
    variant === "navbar"
      ? "flex items-center text-base font-semibold tracking-tight text-fg"
      : "inline-flex items-center justify-center opacity-90 transition hover:opacity-100";

  const imageClass =
    variant === "navbar"
      ? "pointer-events-none h-10 w-auto sm:h-11"
      : "pointer-events-none h-9 w-auto sm:h-10";

  return (
    <Link href="/challenges" prefetch={false} className={linkClass}>
      <Image
        src={logo}
        alt="Mikkaiser Coder logo"
        width={variant === "navbar" ? 216 : 192}
        height={variant === "navbar" ? 58 : 50}
        priority={variant === "navbar"}
        sizes={
          variant === "navbar"
            ? "(max-width: 768px) 168px, 216px"
            : "(max-width: 640px) 168px, 192px"
        }
        className={imageClass}
      />
    </Link>
  );
}
