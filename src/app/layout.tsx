import type { Metadata, Viewport } from "next";
import {
  Space_Grotesk,
  Inter,
  JetBrains_Mono,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";
import Script from "next/script";
import AppProvider from "@/components/providers/AppProvider";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const arabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ar",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zygnal-sy.com"),
  title: {
    default: "Zygnal — Mobile Network Infrastructure & Deployment",
    template: "%s · Zygnal",
  },
  description:
    "Zygnal builds, powers, and modernizes mobile networks across Syria — from the first site survey to live 5G. Field-proven engineering, multi-vendor experience, delivered on schedule.",
  keywords: [
    "telecom infrastructure",
    "network deployment",
    "BTS installation",
    "5G modernization",
    "tower construction",
    "Syria telecom",
    "Zygnal",
  ],
  openGraph: {
    title: "Zygnal — Mobile Network Infrastructure & Deployment",
    description:
      "We build, power, and modernize mobile networks across Syria — from bare ground to live signal.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#05080d",
};

// Runs before paint: applies stored theme + locale so there is no flash.
const initScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t='dark';var l=localStorage.getItem('locale');if(l!=='en'&&l!=='ar')l='en';var d=document.documentElement;d.setAttribute('data-theme',t);d.setAttribute('lang',l);d.setAttribute('dir',l==='ar'?'rtl':'ltr');if(l==='ar')d.classList.add('lang-ar');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable} ${arabic.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg text-text">
        <Script id="app-init" strategy="beforeInteractive">
          {initScript}
        </Script>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
