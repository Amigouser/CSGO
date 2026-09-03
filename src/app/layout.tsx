import type { Metadata, Viewport } from "next";
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
  title: "TomskGG — турниры по Dota 2 и CS2 в Томске",
  description:
    "TomskGG — киберспортивная платформа Томска: турниры по Dota 2 и CS2 (Counter-Strike 2) в Томске. Регистрация через Steam, автодрафт команд, турнирная сетка, рейтинг и статистика игроков.",
  keywords: [
    "TomskGG",
    "турниры по доте",
    "dota 2 турниры Томск",
    "cs2 турниры Томск",
    "киберспорт Томск",
    "киберспорт Томская область",
  ],
  openGraph: {
    title: "TomskGG — турниры по Dota 2 и CS2 в Томске",
    description:
      "TomskGG — киберспортивная платформа Томска: турниры по Dota 2 и CS2 в Томске.",
    url: "https://tomskgg.ru",
    siteName: "TomskGG",
    locale: "ru_RU",
    type: "website",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "TomskGG",
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
        <script
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
              name: "TomskGG",
              alternateName: "Tomsk Gaming",
              url: "https://tomskgg.ru",
              description:
                "TomskGG — киберспортивная платформа Томска: турниры по Dota 2 и CS2 в Томске.",
              areaServed: { "@type": "City", name: "Томск" },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Томск",
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
