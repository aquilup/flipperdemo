"use client";

import { FaGithub, FaXTwitter, FaYoutube, FaDiscord } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

const socials = [
  { icon: FaGithub, label: "GitHub", href: "https://github.com/flipperdevices" },
  { icon: FaXTwitter, label: "X", href: "https://twitter.com/flipper_zero" },
  { icon: FaYoutube, label: "YouTube", href: "https://www.youtube.com/@FlipperZero" },
  { icon: FaDiscord, label: "Forum", href: "https://forum.flipperzero.one/" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-black/10 bg-white px-6 py-16">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="font-[family-name:var(--font-space)] text-lg tracking-wide text-black">
            Flipper<span className="text-[#FF8200]">Zero</span>
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-black/50">
            Open-source portable multi-tool for hardware exploration, education,
            and ethical security research.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/10 text-black/60 transition hover:border-[#FF8200]/40 hover:text-[#FF9A33] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8200]"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <form
          className="rounded-3xl border border-black/10 bg-white/80 p-6 backdrop-blur"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Newsletter signup"
        >
          <label htmlFor="email" className="text-sm text-black/70">
            Stay in the ecosystem
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              id="email"
              type="email"
              required
              placeholder="you@lab.dev"
              className="h-11 flex-1 rounded-full border border-black/10 bg-white px-4 text-sm text-black outline-none ring-[#FF8200]/40 placeholder:text-black/30 focus:ring-2"
            />
            <Button type="submit" size="sm">
              Subscribe
            </Button>
          </div>
        </form>
      </div>
      <p className="mx-auto mt-12 max-w-7xl text-xs text-black/30">
        © {new Date().getFullYear()} Flipper Zero concept experience. For
        educational and authorized research use only.
      </p>
    </footer>
  );
}
