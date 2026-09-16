"use client";

import Link from "next/link";
import { Trophy } from "lucide-react";
import { useState, useEffect } from "react";
import ParticleCanvas from "@/components/ui/ParticleCanvas";
import { useI18n } from "@/lib/i18n";

export default function HeroSection() {
  const { t } = useI18n();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setIsLoggedIn(!!data?.id))
      .catch(() => setIsLoggedIn(false));
  }, []);

  return (
    <section
      className="relative overflow-hidden py-16 sm:py-24 px-4"
      style={{
        background:
          "linear-gradient(135deg, var(--background) 0%, #1a0808 50%, #080818 100%)",
      }}
    >
      {/* Particle background */}
      <ParticleCanvas />

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, var(--gold) 0%, transparent 50%), radial-gradient(circle at 80% 50%, var(--red) 0%, transparent 50%)",
        }}
      />

      {/* Animated glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(200,155,60,0.15) 0%, transparent 70%)",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(229,83,75,0.1) 0%, transparent 70%)",
          animation: "float 10s ease-in-out infinite reverse",
        }}
      />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold mb-8 fade-in-up"
          style={{
            background: "rgba(200,155,60,0.1)",
            border: "1px solid rgba(200,155,60,0.3)",
            color: "var(--gold)",
            animationDelay: "0ms",
            backdropFilter: "blur(10px)",
          }}
        >
          <span className="flex items-center gap-3 justify-center">
            <Trophy size={24} style={{ color: "var(--gold)" }} />
            <span className="hidden sm:inline">{t.hero.badge}</span>
            <span className="sm:hidden">ZamesGG — CS2</span>
          </span>
        </div>

        {/* Title with shimmer effect */}
        <h1
          className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 leading-tight fade-in-up"
          style={{ animationDelay: "100ms" }}
        >
          <span style={{ color: "var(--foreground)" }}>{t.hero.title1} </span>
          <span
            className="inline-block"
            style={{
              color: "var(--gold)",
              textShadow: "0 0 40px rgba(200,155,60,0.3)",
            }}
          >
            {t.hero.titleHighlight}
          </span>
          <br />
          <span style={{ color: "var(--foreground)" }}>{t.hero.title2} </span>
          <span
            className="relative inline-block"
            style={{
              background: "linear-gradient(90deg, var(--red), var(--gold), var(--red))",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmerText 3s linear infinite",
            }}
          >
            {t.hero.titleGame}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-base sm:text-lg md:text-xl mb-10 max-w-2xl mx-auto fade-in-up leading-relaxed"
          style={{ color: "var(--text-sub)", animationDelay: "200ms" }}
        >
          {t.hero.subtitle}
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up"
          style={{ animationDelay: "300ms" }}
        >
          <Link
            href="/tournaments"
            className="group w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm transition-all glow-gold inline-flex items-center justify-center gap-2 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
              color: "var(--background)",
            }}
          >
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            <Trophy size={18} style={{ color: "var(--background)" }} />
            {t.hero.viewTournaments}
          </Link>
          {!isLoggedIn && (
            <Link
              href="/login"
              className="group w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm transition-all inline-flex items-center justify-center gap-2 relative overflow-hidden"
              style={{
                background: "var(--surface-2)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
              }}
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity" />
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ color: "var(--gold)" }}
              >
                <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.606 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.76-1.121-1.39-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.252 0-2.265-1.014-2.265-2.265z" />
              </svg>
              {t.hero.loginSteam}
            </Link>
          )}
        </div>

        {/* Scroll indicator */}
        <div
          className="mt-16 fade-in-up"
          style={{ animationDelay: "500ms" }}
        >
          <div
            className="mx-auto w-6 h-10 rounded-full border-2 flex justify-center pt-2"
            style={{ borderColor: "rgba(200,155,60,0.3)" }}
          >
            <div
              className="w-1.5 h-3 rounded-full"
              style={{
                background: "var(--gold)",
                animation: "scrollBounce 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes shimmerText {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
