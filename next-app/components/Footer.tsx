import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logo-mikkaiser-coder.png";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 w-full shrink-0 border-t border-border bg-surface/70 backdrop-blur">
      <div className="container-app flex flex-col items-center justify-center gap-4 py-5 text-center">
        <Link
          href="/challenges"
          className="inline-flex items-center justify-center opacity-90 transition hover:opacity-100"
        >
          <Image
            src={logo}
            alt="Mikkaiser Coder logo"
            width={160}
            height={42}
            sizes="(max-width: 640px) 140px, 160px"
            className="h-7 w-auto sm:h-8"
          />
        </Link>
        <p className="text-sm text-muted">
          © {year} Mikkaiser Coder. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
