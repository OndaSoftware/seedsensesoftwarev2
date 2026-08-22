import Image from "next/image";
import Link from "next/link";
import { navLinks, site } from "@/lib/site";
import OpenAppButton from "@/components/OpenAppButton";
import SessionCta from "@/components/SessionCta";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-footer text-white/75">
      <div className="px-5 pt-16 pb-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="SeedSense home">
              <Image
                src="/images/sslogo.png"
                alt="SeedSense Logo"
                width={101}
                height={36}
                className="mb-5 h-9 w-auto brightness-0 invert opacity-90"
              />
            </Link>
            <p className="mb-6 max-w-[260px] text-[0.925rem] leading-relaxed text-white/60">
              The seed trial platform built for modern agribusiness.
            </p>
            <a
              href="#contact"
              className="inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Request a Demo
            </a>
          </div>

          <div>
            <h4 className="mb-5 text-[0.7rem] font-bold tracking-[0.1em] text-white/40 uppercase">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.95rem] text-white/75 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="mb-5 text-[0.7rem] font-bold tracking-[0.1em] text-white/40 uppercase">
              Get in Touch
            </h4>
            <a
              href={`tel:${site.phone}`}
              className="border-b border-white/[0.07] py-2.5 text-sm text-white/75 transition-colors hover:text-white"
            >
              {site.phoneDisplay}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="border-b border-white/[0.07] py-2.5 text-sm text-white/75 transition-colors hover:text-white"
            >
              {site.email}
            </a>
            {/* Same device/session split as the header — see SiteHeader. */}
            <OpenAppButton className="block border-b border-white/[0.07] py-2.5 text-sm text-white/75 transition-colors hover:text-white app:hidden" />
            <SessionCta
              className="hidden border-b border-white/[0.07] py-2.5 text-sm text-white/75 transition-colors hover:text-white app:block"
              signedInLabel="Go to Dashboard"
              signedOutLabel="Login to SeedSense"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-[0.825rem] text-white/40">
          <p>
            © {year}{" "}
            <a
              href={site.ondaUrl}
              className="text-white/40 transition-colors hover:text-white/75"
            >
              Onda Software
            </a>
            . All rights reserved.
          </p>
          <a
            href={site.policyUrl}
            className="text-white/40 transition-colors hover:text-white/75"
          >
            Privacy Policy | Terms Of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
