"use client";

import Link from "next/link";
import { Swords } from "lucide-react";
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
      {/* 1. Tactical CS2-inspired background */}
      <TacticalBackground />

      {/* 2. Particle layer */}
      <ParticleCanvas />

      {/* 3. Radial glow accents */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, var(--gold) 0%, transparent 50%), radial-gradient(circle at 80% 50%, var(--red) 0%, transparent 50%)",
        }}
      />

      {/* 4. Dark overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(13, 17, 23, 0.72)" }}
      />

      {/* 5. Ambient glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(200,155,60,0.12) 0%, transparent 70%)",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(229,83,75,0.08) 0%, transparent 70%)",
          animation: "float 10s ease-in-out infinite reverse",
        }}
      />
      {/* Cold-blue accent glow (opposite side from warm) */}
      <div
        className="absolute bottom-1/3 left-1/6 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(79,184,240,0.06) 0%, transparent 70%)",
          animation: "float 12s ease-in-out infinite",
        }}
      />

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Badge — swords instead of trophy */}
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
            <Swords size={22} style={{ color: "var(--gold)" }} />
            <span className="hidden sm:inline">{t.hero.badge}</span>
            <span className="sm:hidden">ZamesGG — CS2</span>
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 leading-tight fade-in-up"
          style={{ animationDelay: "100ms" }}
        >
          <span style={{ color: "var(--foreground)" }}>Заходи. </span>
          <span
            className="inline-block"
            style={{
              color: "var(--gold)",
              textShadow: "0 0 40px rgba(200,155,60,0.3)",
            }}
          >
            Играй.
          </span>
          <br />
          <span
            className="relative inline-block"
            style={{
              background:
                "linear-gradient(90deg, var(--red), var(--gold), var(--red))",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmerText 3s linear infinite",
            }}
          >
            Побеждай.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-base sm:text-lg md:text-xl mb-10 max-w-2xl mx-auto fade-in-up leading-relaxed"
          style={{ color: "var(--text-sub)", animationDelay: "200ms" }}
        >
          {t.hero.subtitle}
        </p>

        {/* CTA Buttons — primary + secondary */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up"
          style={{ animationDelay: "300ms" }}
        >
          {/* Primary: Смотреть турниры */}
          <Link
            href="/tournaments"
            className="group w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm transition-all glow-gold inline-flex items-center justify-center gap-2 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, var(--gold), var(--gold-light))",
              color: "var(--background)",
            }}
          >
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            <Swords size={18} style={{ color: "var(--background)" }} />
            {t.hero.viewTournaments}
          </Link>

          {/* Secondary: Войти через Steam (outline) */}
          {!isLoggedIn && (
            <Link
              href="/login"
              className="group w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm transition-all inline-flex items-center justify-center gap-2 relative overflow-hidden"
              style={{
                background: "transparent",
                color: "var(--text-sub)",
                border: "1px solid var(--border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(200,155,60,0.4)";
                e.currentTarget.style.color = "var(--foreground)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text-sub)";
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ opacity: 0.6 }}
              >
                <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.606 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.76-1.121-1.39-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.252 0-2.265-1.014-2.265-2.265z" />
              </svg>
              {t.hero.loginSteam}
            </Link>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 fade-in-up" style={{ animationDelay: "500ms" }}>
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

/* ─── Tactical CS2-inspired SVG background ─── */

function TacticalBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity: 0.5 }}
    >
      <defs>
        {/* Fine grid */}
        <pattern
          id="tg"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 60 0 L 0 0 0 60"
            fill="none"
            stroke="rgba(200,155,60,0.06)"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>

      {/* Grid fill */}
      <rect width="1200" height="600" fill="url(#tg)" />

      {/* Radar circles */}
      <circle
        cx="600"
        cy="300"
        r="250"
        fill="none"
        stroke="rgba(200,155,60,0.08)"
        strokeWidth="1"
      />
      <circle
        cx="600"
        cy="300"
        r="180"
        fill="none"
        stroke="rgba(200,155,60,0.06)"
        strokeWidth="1"
      />
      <circle
        cx="600"
        cy="300"
        r="110"
        fill="none"
        stroke="rgba(200,155,60,0.04)"
        strokeWidth="1"
      />
      <circle
        cx="600"
        cy="300"
        r="40"
        fill="none"
        stroke="rgba(200,155,60,0.03)"
        strokeWidth="1"
      />

      {/* Crosshairs */}
      <line
        x1="600" y1="0" x2="600" y2="600"
        stroke="rgba(200,155,60,0.04)"
        strokeWidth="0.5"
      />
      <line
        x1="0" y1="300" x2="1200" y2="300"
        stroke="rgba(200,155,60,0.04)"
        strokeWidth="0.5"
      />

      {/* Diagonal guides */}
      <line
        x1="200" y1="0" x2="1000" y2="600"
        stroke="rgba(200,155,60,0.025)"
        strokeWidth="0.5"
      />
      <line
        x1="1000" y1="0" x2="200" y2="600"
        stroke="rgba(200,155,60,0.025)"
        strokeWidth="0.5"
      />

      {/* Hexagonal callout areas */}
      <polygon
        points="150,100 180,80 210,100 210,140 180,160 150,140"
        fill="none"
        stroke="rgba(200,155,60,0.1)"
        strokeWidth="1"
      />
      <polygon
        points="950,400 980,380 1010,400 1010,440 980,460 950,440"
        fill="none"
        stroke="rgba(229,83,75,0.08)"
        strokeWidth="1"
      />
      <polygon
        points="400,450 420,435 440,450 440,480 420,495 400,480"
        fill="none"
        stroke="rgba(200,155,60,0.06)"
        strokeWidth="1"
      />
      <polygon
        points="800,80 820,65 840,80 840,110 820,125 800,110"
        fill="none"
        stroke="rgba(200,155,60,0.07)"
        strokeWidth="1"
      />

      {/* Waypoint dots */}
      <circle cx="300" cy="150" r="3" fill="rgba(200,155,60,0.15)" />
      <circle cx="900" cy="450" r="3" fill="rgba(200,155,60,0.15)" />
      <circle cx="150" cy="300" r="2" fill="rgba(229,83,75,0.12)" />
      <circle cx="1050" cy="150" r="2" fill="rgba(229,83,75,0.12)" />
      <circle cx="600" cy="100" r="2" fill="rgba(200,155,60,0.1)" />
      <circle cx="600" cy="500" r="2" fill="rgba(200,155,60,0.1)" />
      <circle cx="350" cy="400" r="2.5" fill="rgba(200,155,60,0.1)" />
      <circle cx="850" cy="200" r="2.5" fill="rgba(200,155,60,0.1)" />

      {/* Dashed range arc */}
      <path
        d="M 350,300 A 250,250 0 0,1 600,50"
        fill="none"
        stroke="rgba(200,155,60,0.05)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <path
        d="M 600,550 A 250,250 0 0,1 850,300"
        fill="none"
        stroke="rgba(200,155,60,0.04)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />

      {/* Thin connection lines between dots */}
      <line x1="300" y1="150" x2="600" y2="300" stroke="rgba(200,155,60,0.04)" strokeWidth="0.5" />
      <line x1="900" y1="450" x2="600" y2="300" stroke="rgba(200,155,60,0.04)" strokeWidth="0.5" />
      <line x1="850" y1="200" x2="600" y2="300" stroke="rgba(200,155,60,0.03)" strokeWidth="0.5" />
      <line x1="350" y1="400" x2="600" y2="300" stroke="rgba(200,155,60,0.03)" strokeWidth="0.5" />
    </svg>
  );
}
