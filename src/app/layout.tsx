import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import { NotificationProvider } from "@/components/ui/NotificationCenter";
import { I18nProvider } from "@/lib/i18n";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZamesGG — турниры по CS2 в Zamesе",
  description:
    "ZamesGG — киберспортивная платформа Zamesа: турниры по CS2 (Counter-Strike 2) в Zamesе. Регистрация через Steam, турнирная сетка, рейтинг и статистика игроков.",
  keywords: [
    "ZamesGG",
    "cs2 турниры Zames",
    "counter-strike 2 турниры",
    "киберспорт Zames",
    "киберспорт Zamesая область",
  ],
  openGraph: {
    title: "ZamesGG — турниры по CS2 в Zamesе",
    description:
      "ZamesGG — киберспортивная платформа Zamesа: турниры по CS2 в Zamesе.",
    url: "https://zamesgg.ru",
    siteName: "ZamesGG",
    locale: "ru_RU",
    type: "website",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ZamesGG",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d1117",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" data-theme="dark" suppressHydrationWarning>
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t);})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ZamesGG",
              alternateName: "Zames Gaming",
              url: "https://zamesgg.ru",
              description:
                "ZamesGG — киберспортивная платформа Zamesа: турниры по CS2 в Zamesе.",
              areaServed: { "@type": "City", name: "Zames" },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Zames",
                addressCountry: "RU",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ background: "var(--background)", color: "var(--foreground)" }}
      >
        <I18nProvider>
          <NotificationProvider>
            <Navbar />
            <main className="min-h-screen pb-16 md:pb-0" style={{ background: "var(--background)" }}>
              {children}
            </main>
            <Footer />
            <BottomNav />
          </NotificationProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
