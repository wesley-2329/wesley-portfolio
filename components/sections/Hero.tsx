"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { site, socials } from "@/data";
import { useApp } from "@/components/providers/AppProviders";
import { SplitText } from "@/components/ui/SplitText";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { HeroParticles } from "@/components/visuals/HeroParticles";
import { HeroPortrait } from "./HeroPortrait";
import { ease } from "@/lib/motion";

export function Hero() {
  const { introDone: show, scrollTo } = useApp();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Cinematic exit: the name parts drift apart, the portrait sinks and the copy dissolves.
  const firstX = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const lastX = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const fadeIn = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: show ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, delay, ease: ease.expo },
  });

  const github = socials.find((s) => s.id === "github")!;
  const linkedin = socials.find((s) => s.id === "linkedin")!;
  const resumeHref = site.resume.pdf ?? site.resume.external;

  return (
    <section
      id="home"
      ref={ref}
      aria-label="Introduction"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pb-10 pt-24 md:pt-28"
    >
      {/* ---------- Atmosphere ---------- */}
      <motion.div aria-hidden style={{ y: bgY }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_35%,#000_20%,transparent_75%)]" />
        <div className="absolute -left-[10%] -top-[20%] h-[70vh] w-[60vw] animate-drift rounded-full bg-violet/20 blur-[120px]" />
        <div className="absolute -right-[15%] top-[10%] h-[60vh] w-[50vw] animate-drift-slow rounded-full bg-cyan/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[30%] h-[50vh] w-[45vw] animate-drift rounded-full bg-sand/[0.07] blur-[120px]" />
        {/* Light beam from above */}
        <div className="absolute left-1/2 top-0 h-[90vh] w-[70vw] -translate-x-1/2 bg-[conic-gradient(from_180deg_at_50%_0%,transparent_42%,rgba(181,168,255,0.10)_50%,transparent_58%)]" />
        <HeroParticles className="absolute inset-0 h-full w-full" />
      </motion.div>
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-ink" />

      <div className="container relative flex flex-1 flex-col">
        {/* ---------- Top meta row ---------- */}
        <motion.div style={{ opacity: copyOpacity }} className="flex items-center justify-between gap-4">
          {site.availability.open && (
            <motion.div {...fadeIn(0.2)} className="chip border-signal/20 bg-signal/[0.06] text-signal">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-signal" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              {site.availability.label}
            </motion.div>
          )}
          <motion.p {...fadeIn(0.3)} className="eyebrow hidden md:block">
            Integrated M.Tech · ABV-IIITM Gwalior
          </motion.p>
        </motion.div>

        {/* ---------- Name + portrait ---------- */}
        <div className="relative mt-8 flex flex-1 flex-col justify-center md:mt-4">
          <h1 className="sr-only">
            John Wesley — {site.roles.join(", ")}
          </h1>

          <div aria-hidden className="relative select-none text-display-xl font-semibold uppercase">
            <motion.div style={{ x: firstX }} className="relative z-0">
              <SplitText text="John" by="char" trigger={show} delay={0.1} stagger={0.06} className="block text-fg" />
            </motion.div>
            <motion.div style={{ x: lastX }} className="relative z-0 text-right">
              <SplitText text="Wesley" by="char" trigger={show} delay={0.3} stagger={0.06} className="block text-fg" />
            </motion.div>

            {/* Portrait sits between the two lines on large screens */}
            <div className="pointer-events-auto absolute left-1/2 top-1/2 z-10 hidden w-[clamp(220px,23vw,360px)] -translate-x-1/2 -translate-y-[46%] lg:block">
              <motion.div style={{ y: portraitY, scale: portraitScale }}>
                <HeroPortrait show={show} />
              </motion.div>
            </div>

            {/* Outlined echo of the name drawn over the portrait for depth */}
            <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
              <motion.div style={{ x: firstX }}>
                <SplitText text="John" by="char" trigger={show} delay={0.1} stagger={0.06} className="block text-transparent [-webkit-text-stroke:1.5px_rgba(237,237,239,0.7)]" />
              </motion.div>
              <motion.div style={{ x: lastX }} className="text-right">
                <SplitText text="Wesley" by="char" trigger={show} delay={0.3} stagger={0.06} className="block text-transparent [-webkit-text-stroke:1.5px_rgba(237,237,239,0.7)]" />
              </motion.div>
            </div>
          </div>

          {/* Portrait in flow on small screens */}
          <motion.div style={{ y: portraitY }} className="mx-auto mt-8 w-[min(78vw,360px)] lg:hidden">
            <HeroPortrait show={show} />
          </motion.div>
        </div>

        {/* ---------- Copy + CTAs ---------- */}
        <motion.div
          style={{ opacity: copyOpacity, y: copyY }}
          className="relative z-30 mt-10 grid gap-8 lg:mt-6 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-6">
            <motion.ul {...fadeIn(0.9)} className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-fg">
              {site.roles.map((r, i) => (
                <li key={r} className="flex items-center gap-3">
                  {i > 0 && <span className="h-3 w-px bg-line-strong" />}
                  {r}
                </li>
              ))}
            </motion.ul>
            <motion.p {...fadeIn(1.05)} className="mt-5 max-w-xl text-base leading-relaxed text-fg-muted md:text-lg">
              I build full-stack products and applied AI systems — from an end-to-end HR platform and computer-vision
              inspection to driving-policy research and NLP for Indian languages.
            </motion.p>
          </div>

          <motion.div {...fadeIn(1.2)} className="flex flex-wrap items-center gap-3 lg:col-span-6 lg:justify-end">
            <Magnetic>
              <ButtonLink
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("projects");
                }}
                icon={<ArrowDownRight className="h-4 w-4" />}
              >
                View Projects
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink
                variant="ghost"
                href={resumeHref}
                target="_blank"
                rel="noreferrer"
                download={site.resume.pdf ? "" : undefined}
                icon={<ArrowUpRight className="h-4 w-4" />}
              >
                Download Resume
              </ButtonLink>
            </Magnetic>
            <div className="flex items-center gap-2">
              {[
                { s: github, Icon: FaGithub },
                { s: linkedin, Icon: FaLinkedinIn },
              ].map(({ s, Icon }) => (
                <Magnetic key={s.id} strength={0.5}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${s.label} (opens in a new tab)`}
                    className="grid h-12 w-12 place-items-center rounded-full border border-line-strong bg-white/[0.02] text-fg-muted backdrop-blur-md transition-colors duration-300 hover:border-white/30 hover:text-fg"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ---------- Scroll cue ---------- */}
        <motion.div style={{ opacity: copyOpacity }} className="mx-auto mt-10">
          <motion.button
            type="button"
            onClick={() => scrollTo("about")}
            {...fadeIn(1.5)}
            className="group flex flex-col items-center gap-3"
            aria-label="Scroll to About"
          >
            <span className="eyebrow transition-colors group-hover:text-fg">Scroll</span>
            <span className="relative h-12 w-px overflow-hidden bg-line">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-cue bg-gradient-to-b from-transparent via-fg to-transparent" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
