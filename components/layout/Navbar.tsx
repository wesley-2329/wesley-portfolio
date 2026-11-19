"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { navItems, site, socials } from "@/data";
import { useApp } from "@/components/providers/AppProviders";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion";

const ids = navItems.map((n) => n.id);

export function Navbar() {
  const { introDone, scrollTo } = useApp();
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 600 && !open);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // Wait for the mobile menu to start closing before scrolling.
    setTimeout(() => scrollTo(id), open ? 350 : 0);
  };

  return (
    <>
      {/* Scroll progress */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-violet via-cyan to-sand"
        style={{ scaleX: progress }}
      />

      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={introDone ? { y: hidden ? -100 : 0, opacity: 1 } : { y: -40, opacity: 0 }}
        transition={{ duration: 0.8, ease: ease.expo, delay: introDone && !scrolled ? 0.9 : 0 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <nav
          aria-label="Primary"
          className={cn(
            "mx-auto mt-3 flex h-14 max-w-[1360px] items-center justify-between rounded-full px-3 transition-[background-color,border-color,backdrop-filter] duration-500 md:mt-4 md:px-4",
            "mx-3 md:mx-6 xl:mx-auto",
            scrolled || open ? "border border-line bg-ink/70 backdrop-blur-xl" : "border border-transparent"
          )}
        >
          <a href="#home" onClick={go("home")} className="group flex items-center gap-2.5 pl-1" aria-label="John Wesley — back to top">
            <span className="relative grid h-9 w-9 place-items-center rounded-full border border-line-strong bg-white/[0.03] font-mono text-[0.7rem] font-medium tracking-tight">
              JW
              <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet/40 to-cyan/30 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:inline">{site.name}</span>
          </a>

          <ul className="relative hidden items-center gap-0.5 rounded-full border border-line bg-white/[0.02] p-1 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={go(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative block rounded-full px-3.5 py-1.5 text-[0.8rem] transition-colors duration-300",
                      isActive ? "text-fg" : "text-fg-muted hover:text-fg"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={go("contact")}
              className="group hidden h-9 items-center gap-2 rounded-full bg-fg px-4 text-[0.8rem] font-medium text-ink transition-colors hover:bg-white md:inline-flex"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-signal" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              Let&apos;s talk
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-line bg-white/[0.03] lg:hidden"
            >
              <span
                className={cn(
                  "absolute h-px w-4 bg-fg transition-transform duration-500 ease-expo",
                  open ? "rotate-45" : "-translate-y-[3px]"
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-4 bg-fg transition-transform duration-500 ease-expo",
                  open ? "-rotate-45" : "translate-y-[3px]"
                )}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink/95 px-6 pb-10 pt-28 backdrop-blur-2xl lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: ease.quart }}
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item, i) => (
                <li key={item.id} className="overflow-hidden">
                  <motion.a
                    href={`#${item.id}`}
                    onClick={go(item.id)}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.05, ease: ease.expo }}
                    className={cn(
                      "flex items-baseline gap-4 py-1 text-[clamp(2.25rem,10vw,3.5rem)] font-semibold tracking-[-0.04em]",
                      active === item.id ? "text-fg" : "text-fg-dim"
                    )}
                  >
                    <span className="font-mono text-xs font-normal tracking-normal text-violet-soft">0{i + 1}</span>
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6"
            >
              {socials.map((s) => (
                <a key={s.id} href={s.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-fg-muted">
                  {s.label} <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
              <a href={`mailto:${site.email}`} className="text-sm text-fg-muted">
                {site.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
