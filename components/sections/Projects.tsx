"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Github, Play, Globe } from "lucide-react";
import { moreWork, projects, type Project } from "@/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { TechIcon, hasTechIcon } from "@/components/ui/TechIcon";
import { TrajectoryVisual } from "@/components/visuals/TrajectoryVisual";
import { BiasVisual } from "@/components/visuals/BiasVisual";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useApp } from "@/components/providers/AppProviders";

const linkIcon = { live: Globe, code: Github, demo: Play } as const;

export function Projects() {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative py-28 md:py-40">
      <div className="container">
        <SectionHeading
          id="projects-heading"
          index="04"
          eyebrow="Featured Projects"
          title="Selected work, built end to end."
          emphasis={["end", "end."]}
          intro="Two shipped products and two research projects — each presented with what was actually built and what can be verified."
        />
      </div>

      <div ref={stackRef} className="container relative mt-16 md:mt-24">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} i={i} total={projects.length} progress={scrollYProgress} />
        ))}
      </div>

      <MoreWork />
    </section>
  );
}

function ProjectCard({
  project: p,
  i,
  total,
  progress,
}: {
  project: Project;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each card shrinks & dims slightly as later cards stack over it (desktop).
  const start = i / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - 1 - i) * 0.045]);
  const dim = useTransform(progress, [start, 1], [0, (total - 1 - i) * 0.12]);
  const shownMetrics = p.metrics.filter((m) => m.verified);

  return (
    <div className="mb-8 lg:sticky lg:mb-0 lg:h-[100svh] lg:pt-20" style={{ top: `${i * 18}px` }}>
      <motion.article
        style={{ scale }}
        className="relative origin-top overflow-hidden rounded-[2rem] border border-line bg-ink-800 shadow-[0_-30px_80px_-20px_rgba(0,0,0,0.8)] lg:h-[calc(100svh-6.5rem)]"
        aria-labelledby={`project-${p.slug}`}
      >
        {/* Accent glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full opacity-25 blur-[120px]"
          style={{ background: p.accent }}
        />
        <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 z-30 bg-ink" />

        <div className="grid h-full lg:grid-cols-12">
          {/* ---------- Copy ---------- */}
          <div className="relative z-10 flex flex-col p-7 md:p-10 lg:col-span-5 lg:overflow-y-auto lg:p-9 xl:p-10 no-scrollbar">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-xs text-fg-dim">
                {p.index} / {String(total).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "chip",
                  p.ongoing && "border-signal/25 bg-signal/[0.06] text-signal"
                )}
              >
                {p.ongoing && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />}
                {p.status}
              </span>
            </div>

            <p className="eyebrow mt-6" style={{ color: p.accent }}>
              {p.kicker}
            </p>
            <SplitText
              as="h3"
              id={`project-${p.slug}`}
              text={p.title}
              stagger={0.04}
              className="mt-3 text-[clamp(1.9rem,3vw,2.75rem)] font-semibold leading-[1.02] tracking-[-0.035em]"
            />
            <Reveal delay={0.1}>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-fg-muted">{p.summary}</p>
            </Reveal>

            <ul className="mt-5 grid gap-x-5 gap-y-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {p.highlights.map((h, k) => (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 + k * 0.05, ease: ease.expo }}
                  className="flex gap-2.5 text-[0.82rem] leading-snug text-fg/85"
                >
                  <span aria-hidden className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.accent }} />
                  {h}
                </motion.li>
              ))}
            </ul>

            {shownMetrics.length > 0 && (
              <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-5">
                {shownMetrics.map((m) => (
                  <div key={m.label}>
                    <dt className="sr-only">{m.label}</dt>
                    <dd className="text-xl font-semibold tracking-tight md:text-2xl">{m.value}</dd>
                    <dd className="mt-1 text-xs leading-snug text-fg-dim">{m.label}</dd>
                  </div>
                ))}
              </dl>
            )}

            {p.note && <p className="mt-6 font-mono text-xs text-fg-dim">{p.note}</p>}

            <div className="mt-auto pt-6">
              <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                {p.stack.map((s) => (
                  <li key={s} className="chip">
                    {hasTechIcon(s) && <TechIcon name={s} className="h-3 w-3" />}
                    {s}
                  </li>
                ))}
              </ul>
              {p.links.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-3">
                  {p.links.map((l) => {
                    const Icon = linkIcon[l.kind];
                    return (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex h-10 items-center gap-2 rounded-full border border-line-strong bg-white/[0.03] px-4 text-sm text-fg transition-colors hover:border-white/30 hover:bg-white/[0.07]"
                      >
                        <Icon className="h-4 w-4 text-fg-muted" />
                        {l.label}
                        <ArrowUpRight className="h-3.5 w-3.5 text-fg-dim transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* ---------- Visual ---------- */}
          <div className="relative min-h-[320px] p-3 sm:min-h-[420px] md:p-4 lg:col-span-7 lg:min-h-0 lg:pl-0">
            <ProjectVisual project={p} />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

function ProjectVisual({ project: p }: { project: Project }) {
  const { reducedMotion } = useApp();
  const [hover, setHover] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });
  const primaryLink = p.links[0];

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    // Badge is 96px; centre it on the pointer.
    x.set(e.clientX - r.left - 48);
    y.set(e.clientY - r.top - 48);
  };

  return (
    <motion.div
      className="group relative h-full w-full overflow-hidden rounded-[1.5rem] border border-line bg-ink-900"
      initial={{ clipPath: "inset(12% 12% 12% 12% round 24px)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 24px)", opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: reducedMotion ? 0 : 1.4, ease: ease.quart }}
      onPointerMove={onMove}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      {p.media.type === "image" ? (
        <>
          {/* Browser-chrome frame around the real screenshot */}
          <div className="absolute inset-0 flex flex-col">
            <div className="flex h-9 shrink-0 items-center gap-1.5 border-b border-line bg-ink-800/80 px-4">
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="mx-auto truncate font-mono text-[0.65rem] text-fg-dim">
                {primaryLink?.kind === "live" ? primaryLink.href.replace("https://", "") : p.title}
              </span>
            </div>
            <div className="relative flex-1 overflow-hidden">
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: ease.expo }}
              >
                <Image
                  src={p.media.src}
                  alt={p.media.alt}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover object-top transition-transform duration-[1200ms] ease-expo group-hover:scale-[1.04]"
                />
              </motion.div>
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            </div>
          </div>

          {/* Secondary screenshots float in from the corner */}
          {p.media.secondary && (
            <div className="pointer-events-none absolute bottom-4 right-4 hidden w-[42%] flex-col gap-3 md:flex">
              {p.media.secondary.slice(0, 2).map((s, k) => (
                <motion.div
                  key={s.src}
                  initial={{ opacity: 0, y: 40, rotate: 2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.5 + k * 0.15, ease: ease.expo }}
                  className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] transition-transform duration-700 ease-expo group-hover:-translate-y-1"
                >
                  <Image src={s.src} alt={s.alt} fill sizes="25vw" className="object-cover object-top" />
                </motion.div>
              ))}
            </div>
          )}
        </>
      ) : p.media.variant === "trajectory" ? (
        <TrajectoryVisual />
      ) : (
        <BiasVisual />
      )}

      {/* Cursor-following badge */}
      <AnimatePresence>
        {hover && primaryLink && (
          <motion.a
            href={primaryLink.href}
            target="_blank"
            rel="noreferrer"
            tabIndex={-1}
            aria-hidden
            className="absolute left-0 top-0 z-20 grid h-24 w-24 place-items-center rounded-full bg-fg text-center text-xs font-medium text-ink shadow-[0_10px_40px_rgba(142,123,255,0.5)]"
            style={{ x: sx, y: sy }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: ease.expo }}
          >
            <span className="flex flex-col items-center gap-0.5">
              <ArrowUpRight className="h-4 w-4" />
              {primaryLink.kind === "live" ? "Visit" : primaryLink.kind === "demo" ? "Watch" : "Code"}
            </span>
          </motion.a>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MoreWork() {
  return (
    <div className="container mt-24 md:mt-32">
      <Reveal className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">More on GitHub</h3>
        <a
          href="https://github.com/wesley-2329"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg"
        >
          github.com/wesley-2329
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </Reveal>
      <ul>
        {moreWork.map((w, i) => (
          <motion.li
            key={w.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: i * 0.04, ease: ease.expo }}
          >
            <a
              href={w.href}
              target="_blank"
              rel="noreferrer"
              className="group relative grid gap-3 overflow-hidden border-b border-line py-6 md:grid-cols-12 md:items-center md:gap-6"
            >
              <span
                aria-hidden
                className="absolute inset-0 -z-10 origin-left scale-x-0 bg-gradient-to-r from-violet/[0.08] via-cyan/[0.04] to-transparent transition-transform duration-700 ease-expo group-hover:scale-x-100"
              />
              <span className="font-mono text-xs text-fg-dim md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-lg font-medium tracking-tight transition-transform duration-500 ease-expo group-hover:translate-x-2 md:col-span-3">
                {w.title}
              </span>
              <span className="text-sm leading-relaxed text-fg-muted md:col-span-5">{w.body}</span>
              <span className="flex flex-wrap items-center gap-2 md:col-span-3 md:justify-end">
                {w.tags.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
                <ArrowUpRight className="ml-1 h-4 w-4 text-fg-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
