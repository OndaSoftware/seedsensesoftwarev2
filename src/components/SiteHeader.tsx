import Image from "next/image";
import Link from "next/link";
import { navLinks, site } from "@/lib/site";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-19 items-center border-b border-sage/30 bg-white/90 backdrop-blur-md">
      <div className="relative flex w-full items-center justify-between px-4 sm:px-8">
        <Link href="/" aria-label="SeedSense home" className="transition-opacity hover:opacity-70">
          <Image
            src="/images/sslogo.png"
            alt="SeedSense Logo"
            width={134}
            height={48}
            priority
            className="h-8 w-auto sm:h-12"
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block"
        >
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative text-sm font-medium tracking-wide text-moss transition-colors hover:text-primary"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-primary transition-all duration-250 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={site.portalUrl}
            className="hidden rounded-full border-[1.5px] border-primary/30 px-6 py-2.5 text-[0.95rem] font-semibold text-primary transition-all hover:border-primary hover:bg-primary/5 md:inline-block"
          >
            Login
          </a>
          <a
            href="#contact"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-primary-dark hover:shadow-[0_6px_20px_rgba(40,89,59,0.25)] sm:px-6 sm:py-2.5 sm:text-[0.95rem]"
          >
            Request a Demo
          </a>
        </div>
      </div>
    </header>
  );
}
