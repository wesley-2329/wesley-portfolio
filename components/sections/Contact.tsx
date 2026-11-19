"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Check, Copy, Send } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { site, socials } from "@/data";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { ease } from "@/lib/motion";

const socialIcon = { github: FaGithub, linkedin: FaLinkedinIn, leetcode: SiLeetcode } as const;

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  // No backend: compose a pre-filled email in the visitor's mail client.
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field =
    "peer w-full rounded-2xl border border-line bg-ink/60 px-4 pb-3 pt-6 text-fg outline-none transition-colors placeholder:text-transparent focus:border-violet/60 focus:bg-ink-900";
  const label =
    "pointer-events-none absolute left-4 top-4 origin-left text-sm text-fg-dim transition-all duration-300 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-violet-soft peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[0.7rem]";

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative overflow-hidden pb-20 pt-28 md:pt-40">
      {/* Closing light */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-[80%]">
        <div className="absolute bottom-[-30%] left-1/2 h-[70vh] w-[90vw] -translate-x-1/2 rounded-[100%] bg-gradient-to-t from-violet/30 via-cyan/10 to-transparent blur-[100px]" />
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:linear-gradient(to_top,#000,transparent)]" />
      </div>

      <div className="container">
        <Reveal className="mb-8 flex items-center gap-3">
          <span className="font-mono text-xs text-violet-soft">08</span>
          <span className="h-px w-10 bg-gradient-to-r from-violet/70 to-transparent" />
          <span className="eyebrow">Contact</span>
        </Reveal>

        <SplitText
          as="h2"
          id="contact-heading"
          text="Let's build something that matters."
          emphasis={["matters."]}
          stagger={0.08}
          className="block max-w-6xl text-display font-semibold"
        />

        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="max-w-md text-lg leading-relaxed text-fg-muted">
                Whether it&apos;s an internship, a full-time role, a research collaboration or a product idea — I&apos;d love to
                hear about it.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10">
              <p className="eyebrow">Email</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="group relative text-[clamp(1.1rem,2.2vw,1.6rem)] font-medium tracking-tight"
                >
                  {site.email}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-violet to-cyan transition-transform duration-700 ease-expo group-hover:scale-x-100" />
                </a>
                <button
                  type="button"
                  onClick={copy}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
                  aria-label={copied ? "Email copied" : "Copy email address"}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copied ? "y" : "n"}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {copied ? <Check className="h-4 w-4 text-signal" /> : <Copy className="h-4 w-4" />}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="mt-10">
              <p className="eyebrow">Elsewhere</p>
              <ul className="mt-4 flex flex-col">
                {socials.map((s) => {
                  const Icon = socialIcon[s.id];
                  return (
                    <li key={s.id}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-4 border-b border-line py-4 transition-colors hover:text-fg"
                      >
                        <Icon className="h-4 w-4 text-fg-muted transition-colors group-hover:text-fg" />
                        <span className="font-medium">{s.label}</span>
                        <span className="text-sm text-fg-dim">/{s.handle}</span>
                        <ArrowUpRight className="ml-auto h-4 w-4 text-fg-dim transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <form onSubmit={submit} className="surface relative space-y-4 bg-ink-800/60 p-6 backdrop-blur-xl md:p-8" aria-describedby="form-note">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="relative">
                  <input
                    id="c-name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={field}
                  />
                  <label htmlFor="c-name" className={label}>
                    Your name
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="c-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={field}
                  />
                  <label htmlFor="c-email" className={label}>
                    Email
                  </label>
                </div>
              </div>
              <div className="relative">
                <textarea
                  id="c-message"
                  required
                  rows={6}
                  placeholder="Message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${field} resize-none`}
                />
                <label htmlFor="c-message" className={label}>
                  Tell me about the role or project
                </label>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <p id="form-note" className="max-w-[16rem] text-xs leading-relaxed text-fg-dim">
                  {sent ? "Your email app should now be open with the message ready to send." : "Opens your email app with the message pre-filled."}
                </p>
                <Magnetic>
                  <button
                    type="submit"
                    className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-fg px-6 text-sm font-medium text-ink shadow-[0_8px_30px_-6px_rgba(142,123,255,0.5)] transition-colors hover:bg-white"
                  >
                    Send message
                    <Send className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                  </button>
                </Magnetic>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
