"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUp } from "lucide-react";
import { navItems, site } from "@/data";
import { useApp } from "@/components/providers/AppProviders";

export function Footer() {
  const { scrollTo } = useApp();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  return (
    <footer ref={ref} className="relative z-[2] overflow-hidden border-t border-line bg-ink">
      <div className="container py-12">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div>
            <p className="text-lg font-medium tracking-tight">{site.name}</p>
            <p className="mt-1 text-sm text-fg-muted">{site.roles.join(" · ")}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-2 sm:grid-cols-4">
              {navItems.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(n.id);
                    }}
                    className="text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="group inline-flex items-center gap-2 self-start rounded-full border border-line px-4 py-2 text-sm text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            Back to top
            <ArrowUp className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      <motion.p
        aria-hidden
        style={{ y, opacity }}
        className="pointer-events-none select-none whitespace-nowrap text-center text-[22vw] font-semibold uppercase leading-[0.78] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.12)] [background:linear-gradient(to_bottom,rgba(255,255,255,0.10),transparent_85%)] [-webkit-background-clip:text] [background-clip:text]"
      >
        Wesley
      </motion.p>

      <div className="container flex flex-col gap-2 border-t border-line py-6 text-xs text-fg-dim sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. Designed &amp; engineered with care.
        </p>
        <p>Built with Next.js, Framer Motion &amp; Lenis.</p>
      </div>
    </footer>
  );
}
