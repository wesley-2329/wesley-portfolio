import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import { site, socials } from "@/data";
import "./globals.css";

const serif = localFont({
  src: [
    { path: "../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2", style: "italic", weight: "400" },
  ],
  variable: "--font-serif",
  display: "swap",
  // Only used below the fold, so don't compete with hero assets.
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: `${site.name} — Portfolio`,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "John Wesley",
    "Software Engineer",
    "AI/ML Engineer",
    "Full-Stack Developer",
    "ABV-IIITM Gwalior",
    "Machine Learning",
    "Computer Vision",
    "NLP",
    "React",
    "Portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: site.url,
    title: site.title,
    description: site.description,
    siteName: `${site.name} — Portfolio`,
    images: site.photo.src ? [{ url: site.photo.src, width: site.photo.width, height: site.photo.height, alt: site.photo.alt }] : [],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: site.photo.src ? [site.photo.src] : [],
  },
  icons: { icon: "/w-letter-logo.png", apple: "/w-letter-logo.png" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: site.roles.join(" | "),
  email: `mailto:${site.email}`,
  image: site.photo.src ? `${site.url}${site.photo.src}` : undefined,
  alumniOf: { "@type": "CollegeOrUniversity", name: "ABV-IIITM Gwalior" },
  sameAs: socials.map((s) => s.href),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${serif.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
