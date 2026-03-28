"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ── Brand tokens ───────────────────────────────────────────── */
const B = {
  deepGreen: "#071A0E",
  darkGreen: "#0D2E18",
  green: "#155C35",
  brightGreen: "#1DB954",
  gold: "#C9A84C",
  goldLight: "#E8C96A",
  white: "#F2F5F1",
  charcoal: "#111411",
  dim: "rgba(242,245,241,0.55)",
};

/* ── Slide definitions ──────────────────────────────────────── */
const SLIDES = [
  {
    id: "picks",
    tag: "Mkeka wa Leo",
    headline: ["Today's", "Winning Picks"],
    sub: "Hand-curated predictions powered by deep football intelligence. Don't miss tonight's banker.",
    cta1: { label: "View All Picks", href: "#picks" },
    cta2: { label: "How It Works", href: "#how" },
    accent: B.gold,
    accentSoft: "rgba(201,168,76,0.12)",
    stat: [
      { val: "74%", label: "Win Rate" },
      { val: "7", label: "Win Streak" },
      { val: "1.93", label: "Avg Odds" },
    ],
    visual: "picks",
  },
  {
    id: "promo",
    tag: "Limited Offer",
    headline: ["Unlock VIP", "For Free Today"],
    sub: "Get 7 days of premium tips absolutely free. No credit card required. Join 50,000+ winners now.",
    cta1: { label: "Claim Free VIP", href: "#vip" },
    cta2: { label: "See Plans", href: "#plans" },
    accent: B.brightGreen,
    accentSoft: "rgba(29,185,84,0.12)",
    stat: [
      { val: "7 Days", label: "Free Trial" },
      { val: "50K+", label: "Members" },
      { val: "92%", label: "VIP Win Rate" },
    ],
    visual: "promo",
  },
  {
    id: "whatsapp",
    tag: "Join the Community",
    headline: ["Get Tips on", "WhatsApp Live"],
    sub: "Instant alerts. Real-time analysis. Exclusive community insights delivered straight to your phone.",
    cta1: { label: "Join WhatsApp Group", href: "#wa" },
    cta2: { label: "Learn More", href: "#community" },
    accent: "#25D366",
    accentSoft: "rgba(37,211,102,0.12)",
    stat: [
      { val: "12K+", label: "Members" },
      { val: "Instant", label: "Alerts" },
      { val: "Free", label: "Always" },
    ],
    visual: "whatsapp",
  },
];

const INTERVAL = 5500;
interface VisualProps {
  accent: string;
}

/* ── Visual illustrations (pure SVG per slide) ──────────────── */
function PicksVisual({ accent }: VisualProps) {
  const bars = [82, 67, 91, 74, 88, 55, 95];
  return (
    <svg
      viewBox="0 0 340 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 340 }}
    >
      {/* grid lines */}
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1="20"
          y1={30 + i * 50}
          x2="320"
          y2={30 + i * 50}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
      ))}
      {/* bars */}
      {bars.map((h, i) => {
        const x = 30 + i * 42;
        const barH = h * 1.45;
        const isTop = h >= 88;
        return (
          <g key={i}>
            <rect
              x={x}
              y={210 - barH}
              width={26}
              height={barH}
              rx={5}
              fill={isTop ? accent : "rgba(255,255,255,0.08)"}
              opacity={isTop ? 1 : 0.6}
            />
            {isTop && (
              <rect
                x={x}
                y={210 - barH}
                width={26}
                height={8}
                rx={5}
                fill={accent}
                opacity={0.6}
              />
            )}
            <text
              x={x + 13}
              y={207}
              textAnchor="middle"
              fill="rgba(255,255,255,0.35)"
              fontSize="9"
              fontFamily="sans-serif"
            >{`M${i + 1}`}</text>
          </g>
        );
      })}
      {/* floating badge */}
      <rect
        x="210"
        y="18"
        width="100"
        height="42"
        rx="10"
        fill={accent}
        fillOpacity="0.15"
        stroke={accent}
        strokeOpacity="0.4"
        strokeWidth="1"
      />
      <text
        x="260"
        y="36"
        textAnchor="middle"
        fill={accent}
        fontSize="13"
        fontFamily="'Bebas Neue', sans-serif"
        letterSpacing="1"
      >
        TODAY'S BANKER
      </text>
      <text
        x="260"
        y="52"
        textAnchor="middle"
        fill="rgba(255,255,255,0.7)"
        fontSize="10"
        fontFamily="sans-serif"
      >
        Arsenal · Home Win
      </text>
      {/* football emoji */}
      <text x="32" y="46" fontSize="28">
        ⚽
      </text>
    </svg>
  );
}

function PromoVisual({ accent }: VisualProps) {
  return (
    <svg
      viewBox="0 0 340 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 340 }}
    >
      {/* crown */}
      <text x="170" y="90" textAnchor="middle" fontSize="64">
        👑
      </text>
      {/* glow ring */}
      <circle
        cx="170"
        cy="72"
        r="58"
        stroke={accent}
        strokeOpacity="0.18"
        strokeWidth="28"
      />
      <circle
        cx="170"
        cy="72"
        r="44"
        stroke={accent}
        strokeOpacity="0.10"
        strokeWidth="14"
      />
      {/* 7-day pill */}
      <rect
        x="95"
        y="118"
        width="150"
        height="44"
        rx="22"
        fill={accent}
        fillOpacity="0.15"
        stroke={accent}
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
      <text
        x="170"
        y="136"
        textAnchor="middle"
        fill={accent}
        fontSize="11"
        fontFamily="sans-serif"
        fontWeight="600"
        letterSpacing="1"
      >
        7 DAYS FREE
      </text>
      <text
        x="170"
        y="153"
        textAnchor="middle"
        fill="rgba(255,255,255,0.55)"
        fontSize="10"
        fontFamily="sans-serif"
      >
        No credit card needed
      </text>
      {/* stars */}
      {["★", "★", "★", "★", "★"].map((s, i) => (
        <text key={i} x={120 + i * 24} y="196" fill={accent} fontSize="18">
          {s}
        </text>
      ))}
    </svg>
  );
}

function WhatsAppVisual({ accent }: VisualProps) {
  const msgs = [
    { t: "Arsenal 1-0 · HALF TIME 🔥", r: false },
    { t: "Banker confirmed ✅", r: true },
    { t: "PSG tip just dropped 👇", r: false },
  ];
  return (
    <svg
      viewBox="0 0 340 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 340 }}
    >
      {/* Phone outline */}
      <rect
        x="110"
        y="10"
        width="120"
        height="200"
        rx="18"
        fill="#0a1a0f"
        stroke={accent}
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
      {/* notch */}
      <rect
        x="145"
        y="18"
        width="50"
        height="7"
        rx="4"
        fill={accent}
        fillOpacity="0.18"
      />
      {/* WA icon */}
      <text x="170" y="58" textAnchor="middle" fontSize="28">
        💬
      </text>
      {/* chat bubbles */}
      {msgs.map((m, i) => {
        const y = 76 + i * 42;
        const isR = m.r;
        const bx = isR ? 122 : 118;
        const bw = 104;
        return (
          <g key={i}>
            <rect
              x={bx}
              y={y}
              width={bw}
              height={28}
              rx={8}
              fill={isR ? accent : "rgba(255,255,255,0.09)"}
              fillOpacity={isR ? 0.22 : 1}
            />
            <text
              x={bx + bw / 2}
              y={y + 17}
              textAnchor="middle"
              fill={isR ? accent : "rgba(255,255,255,0.7)"}
              fontSize="7.5"
              fontFamily="sans-serif"
            >
              {m.t}
            </text>
          </g>
        );
      })}
      {/* bottom bar */}
      <rect
        x="118"
        y="190"
        width="104"
        height="14"
        rx="7"
        fill={accent}
        fillOpacity="0.12"
      />
      <text
        x="170"
        y="201"
        textAnchor="middle"
        fill={accent}
        fontSize="8"
        fontFamily="sans-serif"
      >
        Join Group →
      </text>
    </svg>
  );
}
interface SlideVisualProps {
  visual: string;
  accent: string;
}

function SlideVisual({ visual, accent }: SlideVisualProps) {
  if (visual === "picks") return <PicksVisual accent={accent} />;
  if (visual === "promo") return <PromoVisual accent={accent} />;
  if (visual === "whatsapp") return <WhatsAppVisual accent={accent} />;
  return null;
}

/* ── Animated field pattern background ─────────────────────── */
function FieldPattern() {
  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.06,
      }}
      viewBox="0 0 1200 480"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="1200"
        height="480"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
      />
      <line x1="600" y1="0" x2="600" y2="480" stroke="#fff" strokeWidth="2" />
      <circle
        cx="600"
        cy="240"
        r="80"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
      />
      <circle cx="600" cy="240" r="6" fill="#fff" />
      <rect
        x="0"
        y="140"
        width="120"
        height="200"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
      />
      <rect
        x="1080"
        y="140"
        width="120"
        height="200"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
      />
      <rect
        x="0"
        y="180"
        width="50"
        height="120"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
      />
      <rect
        x="1150"
        y="180"
        width="50"
        height="120"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
      />
      <line x1="0" y1="240" x2="120" y2="240" stroke="#fff" strokeWidth="1.5" />
      <line
        x1="1080"
        y1="240"
        x2="1200"
        y2="240"
        stroke="#fff"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/* ── Particle dots ──────────────────────────────────────────── */
function Particles({ accent }: VisualProps) {
  const pts = Array.from({ length: 18 }, (_, i) => ({
    x: 5 + ((i * 5.6) % 95),
    y: 10 + ((i * 7.3) % 80),
    r: 1 + (i % 3),
    d: 2 + (i % 4),
    del: i * 0.3,
  }));
  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      {pts.map((p, i) => (
        <circle
          key={`particle-${i}`}
          cx={`${p.x}%`}
          cy={`${p.y}%`}
          r={p.r}
          fill={accent}
          opacity="0.25"
        >
          <animate
            attributeName="opacity"
            values="0.1;0.5;0.1"
            dur={`${p.d}s`}
            begin={`${p.del}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}
interface ProgressBarProps {
  active: boolean;
  accent: string;
  duration: number;
}
/* ── Progress bar ───────────────────────────────────────────── */
function ProgressBar({ active, accent, duration }: ProgressBarProps) {
  return (
    <div
      style={{
        height: 3,
        background: "rgba(255,255,255,0.08)",
        borderRadius: 99,
        overflow: "hidden",
      }}
    >
      {active && (
        <div
          key={Date.now()}
          style={{
            height: "100%",
            background: accent,
            borderRadius: 99,
            animation: `grow ${duration}ms linear forwards`,
          }}
        />
      )}
    </div>
  );
}
type CSSWithVars = React.CSSProperties & Record<`--${string}`, string | number>;

/* ── Main HeroBanner ────────────────────────────────────────── */
export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [dir, setDir] = useState(1); // 1 = next, -1 = prev
  const [paused, setPaused] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slide = SLIDES[current];
  const accent = slide.accent;

  const goTo = useCallback(
    (idx: number, direction = 1) => {
      setPrev(current);
      setDir(direction);
      setCurrent(idx);
      setAnimKey((k) => k + 1);
    },
    [current]
  );

  const next = useCallback(
    () => goTo((current + 1) % SLIDES.length, 1),
    [current, goTo]
  );
  const prev2 = useCallback(
    () => goTo((current - 1 + SLIDES.length) % SLIDES.length, -1),
    [current, goTo]
  );

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, INTERVAL);
    return () => clearInterval(timerRef.current!);
  }, [paused, next]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes grow { from { width:0% } to { width:100% } }
        @keyframes slideInR { from { transform:translateX(60px); opacity:0 } to { transform:translateX(0); opacity:1 } }
        @keyframes slideInL { from { transform:translateX(-60px); opacity:0 } to { transform:translateX(0); opacity:1 } }
        @keyframes fadeUp  { from { transform:translateY(22px); opacity:0 } to { transform:translateY(0); opacity:1 } }
        @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes pulse   { 0%,100% { box-shadow:0 0 0 0 var(--ac) } 50% { box-shadow:0 0 0 8px transparent } }
        .hero-slide-enter { animation: slideInR 0.55s cubic-bezier(.22,.68,0,1.2) both; }
        .hero-slide-enter-rev { animation: slideInL 0.55s cubic-bezier(.22,.68,0,1.2) both; }
        .hero-stat { animation: fadeUp 0.5s ease both; }
        .hero-tag { animation: fadeIn 0.4s ease both; }
        .hero-h1 { animation: fadeUp 0.45s 0.05s ease both; }
        .hero-sub { animation: fadeUp 0.45s 0.1s ease both; }
        .hero-btns { animation: fadeUp 0.45s 0.18s ease both; }
        .hero-visual { animation: fadeIn 0.5s 0.08s ease both; }
        .hero-cta-primary:hover { filter: brightness(1.12); transform: translateY(-2px); }
        .hero-cta-secondary:hover { background: rgba(255,255,255,0.08) !important; transform: translateY(-2px); }
        .hero-arrow:hover { background: rgba(255,255,255,0.15) !important; }
        .hero-dot:hover { transform: scale(1.3); }
        @media (max-width: 768px) {
          .hero-inner { flex-direction: column !important; padding: 36px 20px 28px !important; }
          .hero-text { max-width: 100% !important; text-align: center; align-items: center !important; }
          .hero-h1-text { font-size: clamp(38px, 10vw, 56px) !important; }
          .hero-visual-wrap { display: flex; justify-content: center; margin-top: 20px; }
          .hero-stats { justify-content: center !important; }
          .hero-btns { flex-direction: column; width: 100%; }
          .hero-cta-primary, .hero-cta-secondary { width: 100% !important; justify-content: center; }
        }
        @media (max-width: 480px) {
          .hero-stats { gap: 16px !important; }
        }
      `}</style>

      <div
        style={
          {
            "--ac": accent,
            position: "relative",
            width: "100%",
            overflow: "hidden",
            background: B.deepGreen,
            borderBottom: `1px solid ${accent}20`,
          } as CSSWithVars
        }
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* ── Background layers ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 70% 80% at 80% 50%, ${accent}12 0%, transparent 65%),
                       radial-gradient(ellipse 40% 60% at 20% 80%, ${B.green}18 0%, transparent 60%),
                       linear-gradient(160deg, ${B.deepGreen} 0%, ${B.charcoal} 100%)`,
            transition: "background 0.7s ease",
          }}
        />
        <FieldPattern />
        <Particles accent={accent} key={current} />

        {/* diagonal accent stripe */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: "28%",
            bottom: 0,
            width: 1,
            background: `linear-gradient(180deg, transparent, ${accent}25, transparent)`,
            pointerEvents: "none",
          }}
        />

        {/* ── Slide content ── */}
        <div
          key={`slide-${slide.id}-${animKey}`}
          className={`hero-inner ${
            dir > 0 ? "hero-slide-enter" : "hero-slide-enter-rev"
          }`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "64px 48px 52px",
            gap: 32,
            minHeight: 420,
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Text side */}
          <div
            className="hero-text"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              maxWidth: 560,
              alignItems: "flex-start",
            }}
          >
            {/* Tag */}
            <div
              className="hero-tag"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 14px",
                borderRadius: 99,
                background: `${accent}18`,
                border: `1px solid ${accent}40`,
                marginBottom: 18,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: accent,
                  boxShadow: `0 0 8px ${accent}`,
                  animation: "pulse 2s infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  letterSpacing: 1.8,
                  color: accent,
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                {slide.tag}
              </span>
            </div>

            {/* Headline */}
            <h1 className="hero-h1" style={{ margin: "0 0 16px" }}>
              {slide.headline.map((line, i) => (
                <div
                  key={i}
                  className="hero-h1-text"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(52px, 6vw, 82px)",
                    lineHeight: 0.95,
                    letterSpacing: 2,
                    color: i === 1 ? accent : B.white,
                    textShadow: i === 1 ? `0 0 40px ${accent}50` : "none",
                  }}
                >
                  {line}
                </div>
              ))}
            </h1>

            {/* Sub */}
            <p
              className="hero-sub"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                lineHeight: 1.65,
                color: B.dim,
                margin: "0 0 28px",
                maxWidth: 440,
              }}
            >
              {slide.sub}
            </p>

            {/* CTA buttons */}
            <div
              className="hero-btns"
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
            >
              <a
                href={slide.cta1.href}
                className="hero-cta-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 26px",
                  borderRadius: 10,
                  background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
                  color: B.deepGreen,
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 16,
                  letterSpacing: 1.5,
                  textDecoration: "none",
                  transition: "all 0.22s ease",
                  boxShadow: `0 4px 20px ${accent}40`,
                  whiteSpace: "nowrap",
                }}
              >
                {slide.id === "whatsapp" && (
                  <span style={{ fontSize: 18 }}>💬</span>
                )}
                {slide.id === "promo" && (
                  <span style={{ fontSize: 18 }}>👑</span>
                )}
                {slide.id === "picks" && (
                  <span style={{ fontSize: 18 }}>⚡</span>
                )}
                {slide.cta1.label}
              </a>
              <a
                href={slide.cta2.href}
                className="hero-cta-secondary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "13px 22px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: B.white,
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 16,
                  letterSpacing: 1.5,
                  textDecoration: "none",
                  transition: "all 0.22s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {slide.cta2.label}
              </a>
            </div>

            {/* Stats row */}
            <div
              className="hero-stat hero-stats"
              style={{
                display: "flex",
                gap: 28,
                marginTop: 36,
                paddingTop: 28,
                borderTop: "1px solid rgba(255,255,255,0.07)",
                width: "100%",
              }}
            >
              {slide.stat.map((s, i) => (
                <div key={`stat-${i}`} style={{ animationDelay: `${i * 80}ms` }}>
                  <div
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 30,
                      color: accent,
                      lineHeight: 1,
                      textShadow: `0 0 16px ${accent}50`,
                    }}
                  >
                    {s.val}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 11,
                      color: B.dim,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      marginTop: 3,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual side */}
          <div
            className="hero-visual hero-visual-wrap"
            style={{ flexShrink: 0, width: "clamp(220px,35%,340px)" }}
          >
            <SlideVisual visual={slide.visual} accent={accent} />
          </div>
        </div>

        {/* ── Navigation arrows ── */}
        {[
          { dir: -1, fn: prev2, symbol: "‹", side: "left" },
          { dir: 1, fn: next, symbol: "›", side: "right" },
        ].map((a) => (
          <button
            key={`arrow-${a.side}`}
            onClick={a.fn}
            className="hero-arrow"
            aria-label={`${a.side} slide`}
            style={{
              position: "absolute",
              top: "50%",
              [a.side]: 20,
              transform: "translateY(-50%)",
              zIndex: 10,
              width: 42,
              height: 42,
              borderRadius: "50%",
              border: `1px solid rgba(255,255,255,0.15)`,
              background: "rgba(0,0,0,0.3)",
              color: B.white,
              fontSize: 24,
              lineHeight: 1,
              cursor: "pointer",
              transition: "background 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(6px)",
            }}
          >
            {a.symbol}
          </button>
        ))}

        {/* ── Bottom controls bar ── */}
        <div
          style={{
            position: "relative",
            zIndex: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            padding: "14px 48px 20px",
            background:
              "linear-gradient(0deg, rgba(7,26,14,0.8) 0%, transparent 100%)",
          }}
        >
          {/* Slide dots + progress */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {SLIDES.map((s, i) => {
              const isActive = i === current;
              return (
                <button
                  key={`dot-${i}`}
                  onClick={() => goTo(i, i > current ? 1 : -1)}
                  className="hero-dot"
                  aria-label={`Slide ${i + 1}`}
                  style={{
                    padding: 0,
                    border: "none",
                    cursor: "pointer",
                    background: "transparent",
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                    alignItems: "center",
                    transition: "transform 0.2s",
                  }}
                >
                  {/* Label */}
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 10,
                      letterSpacing: 1.2,
                      color: isActive ? s.accent : "rgba(255,255,255,0.3)",
                      textTransform: "uppercase",
                      transition: "color 0.3s",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s.id === "picks"
                      ? "Today's Picks"
                      : s.id === "promo"
                      ? "Promotions"
                      : "WhatsApp"}
                  </span>
                  {/* Bar indicator */}
                  <div
                    style={{
                      width: isActive ? 52 : 24,
                      height: 3,
                      borderRadius: 99,
                      overflow: "hidden",
                      background: "rgba(255,255,255,0.1)",
                      transition: "width 0.3s ease",
                    }}
                  >
                    <ProgressBar
                      active={isActive}
                      accent={s.accent}
                      duration={INTERVAL}
                      key={`${animKey}-${i}`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Pause indicator */}
          {paused && (
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10,
                color: "rgba(255,255,255,0.3)",
                letterSpacing: 1,
                position: "absolute",
                right: 48,
              }}
            >
              ⏸ PAUSED
            </span>
          )}
        </div>
      </div>
    </>
  );
}
