"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Code2, BrainCircuit, Boxes } from "lucide-react";
import { about, education } from "@/data";
import { ScrollWords } from "@/components/ui/ScrollWords";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const icons = [Code2, BrainCircuit, Boxes];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yearY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="about" aria-labelledby="about-title" className="relative py-28 md:py-40">
      <div className="container">
        <Reveal className="mb-10 flex items-center gap-3">
          <span className="font-mono text-xs text-violet-soft">01</span>
          <span className="h-px w-10 bg-gradient-to-r from-violet/70 to-transparent" />
          <h2 id="about-title" className="eyebrow">
            About
          </h2>
        </Reveal>

        <ScrollWords
          text={about.statement}
          emphasis={about.emphasis}
          className="max-w-6xl text-[clamp(1.75rem,4.2vw,3.75rem)] font-medium leading-[1.12] tracking-[-0.03em] text-fg"
        />

        <div ref={ref} className="mt-20 grid gap-6 md:mt-28 lg:grid-cols-12">
          {/* Education "ID card" with a parallax year */}
          <Reveal className="lg:col-span-5">
            <SpotlightCard className="relative h-full overflow-hidden p-8 md:p-10">
              <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet/20 blur-3xl" />
              <p className="eyebrow">Education</p>
              <p className="mt-6 text-2xl font-semibold tracking-tight md:text-3xl">{education.institution}</p>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{education.institutionFull}</p>
              <div className="mt-10 flex flex-col gap-1">
                <span className="text-fg">{education.degree}</span>
                <span className="text-fg-muted">{education.field}</span>
              </div>
              <div className="mt-10 flex items-end justify-between gap-4 border-t border-line pt-6">
                <span className="eyebrow">{education.status}</span>
                <motion.span
                  style={{ y: yearY }}
                  className="font-serif text-[clamp(4rem,9vw,7rem)] italic leading-none text-gradient"
                >
                  {education.graduation}
                </motion.span>
              </div>
            </SpotlightCard>
          </Reveal>

          <div className="flex flex-col gap-6 lg:col-span-7">
            <Reveal delay={0.1} className="surface p-8 md:p-10">
              {about.paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-fg-muted md:text-lg [&+p]:mt-5">
                  {p}
                </p>
              ))}
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-3">
              {about.focus.map((f, i) => {
                const Icon = icons[i];
                return (
                  <Reveal key={f.title} delay={0.15 + i * 0.08}>
                    <SpotlightCard className="group h-full p-6">
                      <div className="flex items-center justify-between">
                        <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white/[0.03] text-fg-muted transition-colors duration-500 group-hover:text-violet-soft">
                          <Icon className="h-5 w-5" strokeWidth={1.5} />
                        </span>
                        <span className="font-mono text-xs text-fg-dim">0{i + 1}</span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium tracking-tight">{f.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{f.body}</p>
                    </SpotlightCard>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
