"use client";

import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { SoundToggle } from "@/components/providers/SoundProvider";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const links = [
  { href: "#hardware", label: "Hardware" },
  { href: "#features", label: "Features" },
  { href: "#timeline", label: "Timeline" },
  { href: "#specs", label: "Specs" },
  { href: "#community", label: "Community" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-black/10 bg-white/70 backdrop-blur-xl"
          : "bg-transparent"
      }`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6"
        aria-label="Primary"
      >
        <a
          href="#top"
          className="font-[family-name:var(--font-space)] text-sm font-semibold tracking-[0.2em] text-black uppercase"
        >
          Flipper<span className="text-[#FF8200]">Zero</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="cursor-pointer text-sm text-black/60 transition hover:text-[#FF9A33] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF8200]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <SoundToggle />
          <Button asChild size="sm">
            <a href={SITE.buyUrl} target="_blank" rel="noreferrer">
              Buy Now
            </a>
          </Button>
        </div>
      </nav>
    </motion.header>
  );
}
