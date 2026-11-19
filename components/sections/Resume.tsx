"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import { education, projects, site, skillCategories, timeline } from "@/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";

export function Resume() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.3, 1]);

  const { pdf, external } = site.resume;

  return (
    <section id="resume" aria-labelledby="resume-heading" className="relative overflow-x-clip py-28 md:py-40">
      <div className="container grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <SectionHeading
            id="resume-heading"
            index="07"
            eyebrow="Resume"
            title="Everything, on one page."
            emphasis={["one", "page."]}
            intro="Education, research, projects and skills in a recruiter-friendly format. Download the latest version or take a quick look at the highlights."
          />
          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <ButtonLink
                href={pdf ?? external}
                target="_blank"
                rel="noreferrer"
                download={pdf ? "John_Wesley_Resume.pdf" : undefined}
                icon={<Download className="h-4 w-4" />}
              >
                Download Resume
              </ButtonLink>
            </Magnetic>
            {pdf && (
              <Magnetic>
                <ButtonLink variant="ghost" href={pdf} target="_blank" rel="noreferrer" icon={<ArrowUpRight className="h-4 w-4" />}>
                  Open in new tab
                </ButtonLink>
              </Magnetic>
            )}
          </Reveal>
        </div>

        <div ref={ref} className="[perspective:1600px] lg:col-span-7">
          <motion.div style={{ rotateX, y, opacity }} className="relative origin-bottom">
            <div aria-hidden className="absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-to-tr from-violet/20 via-transparent to-cyan/15 blur-3xl" />
            {pdf ? (
              <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-2xl">
                <object data={`${pdf}#view=FitH&toolbar=0`} type="application/pdf" className="aspect-[1/1.294] w-full" aria-label="Resume preview">
                  <p className="p-6 text-ink">
                    Preview unavailable. <a href={pdf}>Download the PDF</a>.
                  </p>
                </object>
              </div>
            ) : (
              <ResumeAtAGlance />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** A typeset preview built from the site's own (verified) content. */
function ResumeAtAGlance() {
  return (
    <article
      aria-label="Resume highlights"
      className="relative mx-auto aspect-[1/1.294] max-w-[620px] overflow-hidden rounded-2xl border border-white/10 bg-[#f4f3ef] p-[6%] text-[#16161a] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9)]"
    >
      <div className="flex items-start justify-between gap-4 border-b border-black/10 pb-[4%]">
        <div>
          <p className="text-[clamp(1.1rem,2.6vw,1.75rem)] font-semibold tracking-[-0.03em]">{site.name}</p>
          <p className="mt-1 text-[clamp(0.55rem,1.2vw,0.75rem)] text-black/60">{site.roles.join(" · ")}</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-black/10 px-2.5 py-1 font-mono text-[clamp(0.45rem,1vw,0.6rem)] uppercase tracking-[0.15em] text-black/50">
          <FileText className="h-3 w-3" /> At a glance
        </span>
      </div>

      <div className="mt-[4%] grid grid-cols-3 gap-[5%] text-[clamp(0.5rem,1.1vw,0.72rem)] leading-relaxed">
        <div className="col-span-2 space-y-[6%]">
          <Block title="Experience & Research">
            {timeline
              .filter((t) => t.kind !== "Education")
              .map((t) => (
                <div key={t.role} className="mb-2">
                  <p className="font-semibold">
                    {t.role} — {t.org}
                  </p>
                  <p className="text-black/50">{t.period}</p>
                  <p className="text-black/70">{t.summary}</p>
                </div>
              ))}
          </Block>
          <Block title="Projects">
            {projects.map((p) => (
              <div key={p.slug} className="mb-1.5">
                <p className="font-semibold">{p.title}</p>
                <p className="text-black/60">{p.stack.slice(0, 5).join(" · ")}</p>
              </div>
            ))}
          </Block>
        </div>
        <div className="space-y-[10%]">
          <Block title="Education">
            <p className="font-semibold">{education.institution}</p>
            <p className="text-black/70">
              {education.degree}, {education.field}
            </p>
            <p className="text-black/50">Expected {education.graduation}</p>
          </Block>
          <Block title="Skills">
            {skillCategories.slice(0, 4).map((c) => (
              <p key={c.id} className="mb-1 text-black/70">
                <span className="font-semibold text-black">{c.title}: </span>
                {c.skills.slice(0, 5).join(", ")}
              </p>
            ))}
          </Block>
        </div>
      </div>
      {/* Paper sheen */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/[0.06]" />
    </article>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-[3%] font-mono text-[0.85em] uppercase tracking-[0.18em] text-[#6b5cff]">{title}</p>
      {children}
    </div>
  );
}
