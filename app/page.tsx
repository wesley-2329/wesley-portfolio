import { AppProviders } from "@/components/providers/AppProviders";
import { Preloader } from "@/components/layout/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { Atmosphere } from "@/components/layout/Atmosphere";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Research } from "@/components/sections/Research";
import { Education } from "@/components/sections/Education";
import { Resume } from "@/components/sections/Resume";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <AppProviders>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Preloader />
      <Atmosphere />
      <Navbar />
      <main id="main" className="relative z-[2]">
        <Hero />
        <TechMarquee />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Research />
        <Education />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </AppProviders>
  );
}
