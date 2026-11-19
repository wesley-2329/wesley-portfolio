"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { timeline } from "@/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Experience() {
  const track = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="experience" aria-labelledby="experience-heading" className="relative py-28 md:py-40">
      <div className="container">
        <SectionHeading
            id="experience-heading"
            index="02"
            eyebrow="Experience & Research"
            title="A path through research and engineering."
            emphasis={["research", "engineering."]}
            intro="Hands-on research in autonomous driving, an ongoing M.Tech thesis in NLP, and an integrated degree that ties them together."
        />

        <ol ref={track} className="relative mt-20 md:mt-28">
          {/* Track + scroll-drawn progress line */}
          <span aria-hidden className="absolute bottom-0 left-[11px] top-0 w-px bg-line md:left-[calc(25%+11px)]" />
          <motion.span
            aria-hidden
            style={{ scaleY: fill }}
            className="absolute bottom-0 left-[11px] top-0 w-px origin-top bg-gradient-to-b from-violet via-cyan to-sand md:left-[calc(25%+11px)]"
          />

          {timeline.map((item, i) => (
            <li key={item.role} className="relative grid gap-4 pb-16 pl-12 last:pb-0 md:grid-cols-4 md:gap-10 md:pl-0">
              {/* Date column */}
              <div className="md:sticky md:top-32 md:self-start md:pr-10 md:text-right">
                <motion.p
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.8, ease: ease.expo }}
                  className="font-mono text-xs uppercase tracking-[0.18em] text-fg-muted"
                >
                  {item.period}
                </motion.p>
                <p className="mt-2 hidden text-sm text-fg-dim md:block">{item.kind}</p>
              </div>

              {/* Node */}
              <motion.span
                aria-hidden
                initial={{ scale: 0.4, opacity: 0.3 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-40% 0px -40% 0px" }}
                transition={{ duration: 0.6, ease: ease.expo }}
                className="absolute left-0 top-0 grid h-[23px] w-[23px] place-items-center rounded-full border border-line-strong bg-ink md:left-[25%]"
              >
                <span className={cn("h-2 w-2 rounded-full", item.ongoing ? "bg-signal" : "bg-violet")} />
                {item.ongoing && <span className="absolute inset-0 animate-pulse-ring rounded-full border border-signal/60" />}
              </motion.span>

              {/* Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1, delay: 0.05 * i, ease: ease.expo }}
                className="md:col-span-3 md:pl-12"
              >
                <SpotlightCard className="p-7 md:p-9">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{item.role}</h3>
                      <p className="mt-1 text-fg-muted">{item.org}</p>
                    </div>
                    {item.ongoing ? (
                      <span className="chip border-signal/25 bg-signal/[0.06] text-signal">
                        <span className="h-1.5 w-1.5 rounded-full bg-signal" /> Ongoing
                      </span>
                    ) : (
                      <span className="chip">{item.kind}</span>
                    )}
                  </div>
                  <p className="mt-5 text-base text-fg md:text-lg">{item.summary}</p>
                  {item.points.length > 0 && (
                    <ul className="mt-5 space-y-3">
                      {item.points.map((p) => (
                        <li key={p} className="flex gap-3 text-sm leading-relaxed text-fg-muted md:text-[0.95rem]">
                          <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-violet-soft/70" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Topics">
                    {item.tags.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
