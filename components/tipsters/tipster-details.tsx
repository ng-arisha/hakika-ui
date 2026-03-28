"use client";

import { useState } from "react";
 
// ─── Design tokens — all backgrounds enforced via inline styles ───────────────
const C = {
  bgPage:   "#0b140b",
  bgCard:   "#0f1a0f",
  bgInner:  "#141f14",
  bgHover:  "#1a2a1a",
  border:   "#1e2e1e",
  border2:  "#2a3a2a",
  green:    "#4ade80",
  orange:   "#f97316",
  yellow:   "#eab308",
  red:      "#ef4444",
  textPri:  "#f0fdf0",
  textSec:  "#9ca3af",
  textMute: "#6b7280",
};
 
// ─── Types ────────────────────────────────────────────────────────────────────
interface Selection {
  match: string;
  market: string;
  odds: number;
  locked?: boolean;
}
interface BetSlip {
  id: number;
  bookmakers: { name: string; bg: string }[];
  isHot?: boolean;
  countdown: string;
  totalOdds: number;
  estReturn: string;
  type: string;
  sport: string;
  selections: Selection[];
}
 
// ─── Mock data ────────────────────────────────────────────────────────────────
const LAST_10: ("W" | "L")[] = ["W", "W", "W", "L", "W", "W", "W", "W", "L", "W"];
 
const BET_SLIPS: BetSlip[] = [
  {
    id: 1,
    bookmakers: [
      { name: "Sportpesa", bg: "#1d4ed8" },
      { name: "Betin",     bg: "#c2410c" },
      { name: "1xBet",     bg: "#b91c1c" },
    ],
    isHot: true,
    countdown: "02:12:35",
    totalOdds: 14.70,
    estReturn: "Est. 3x return",
    type: "4-Leg Accumulator",
    sport: "Football",
    selections: [
      { match: "Arsenal vs Man City",  market: "Both Teams to Score", odds: 1.85 },
      { match: "Real Madrid vs Barca", market: "Over 2.5 Goals",      odds: 1.72 },
      { match: "PSG vs Bayern",        market: "Home Win",             odds: 2.10 },
      { match: "Napoli vs AC Milan",   market: "BTTS + Over 2.5",     odds: 2.20 },
    ],
  },
  {
    id: 2,
    bookmakers: [
      { name: "Sportpesa", bg: "#1d4ed8" },
      { name: "Betway",    bg: "#15803d" },
    ],
    countdown: "05:45:08",
    totalOdds: 6.20,
    estReturn: "Est. 1.8x return",
    type: "3-Leg Accumulator",
    sport: "Football",
    selections: [
      { match: "Juventus vs Inter",   market: "Home Win", odds: 2.05 },
      { match: "Chelsea vs Arsenal",  market: "BTTS",     odds: 1.75, locked: true },
      { match: "Dortmund vs Leipzig", market: "Over 2.5", odds: 1.72, locked: true },
    ],
  },
  {
    id: 3,
    bookmakers: [
      { name: "Betin", bg: "#c2410c" },
      { name: "1xBet", bg: "#b91c1c" },
    ],
    countdown: "00:58:40",
    totalOdds: 3.45,
    estReturn: "Est. 1.3x return",
    type: "2-Leg Accumulator",
    sport: "Mixed",
    selections: [
      { match: "Lakers vs Warriors",  market: "Away Win", odds: 1.85, locked: true },
      { match: "Federer vs Djokovic", market: "Home Win", odds: 1.72, locked: true },
    ],
  },
];
 
// ─── Chart data ───────────────────────────────────────────────────────────────
const CHART_POINTS = [
  { day: "Mar 1",  acc: 68, roi: 1.2 },
  { day: "Mar 3",  acc: 72, roi: 1.4 },
  { day: "Mar 5",  acc: 80, roi: 1.6 },
  { day: "Mar 7",  acc: 78, roi: 1.5 },
  { day: "Mar 9",  acc: 82, roi: 2.0 },
  { day: "Mar 11", acc: 85, roi: 2.2 },
  { day: "Mar 13", acc: 88, roi: 2.5 },
  { day: "Mar 15", acc: 84, roi: 2.3 },
  { day: "Mar 17", acc: 90, roi: 2.8 },
  { day: "Mar 19", acc: 88, roi: 2.6 },
  { day: "Mar 21", acc: 92, roi: 3.1 },
  { day: "Mar 23", acc: 90, roi: 3.0 },
  { day: "Mar 25", acc: 93, roi: 3.4 },
  { day: "Mar 27", acc: 91, roi: 3.2 },
  { day: "Mar 29", acc: 94, roi: 3.8 },
  { day: "Mar 31", acc: 94, roi: 4.0 },
];
 
// ─── SVG Performance Chart ────────────────────────────────────────────────────
function PerformanceChart() {
  const W = 800, H = 160;
  const P = { top: 16, right: 38, bottom: 28, left: 44 };
  const iW = W - P.left - P.right;
  const iH = H - P.top - P.bottom;
 
  const xS = (i: number) => P.left + (i / (CHART_POINTS.length - 1)) * iW;
  const aY = (v: number) => P.top + iH - ((v - 60) / 40) * iH;
  const rY = (v: number) => P.top + iH - (v / 5) * iH;
 
  const accPath = CHART_POINTS.map((p, i) =>
    `${i === 0 ? "M" : "L"}${xS(i).toFixed(1)},${aY(p.acc).toFixed(1)}`).join(" ");
  const roiPath = CHART_POINTS.map((p, i) =>
    `${i === 0 ? "M" : "L"}${xS(i).toFixed(1)},${rY(p.roi).toFixed(1)}`).join(" ");
  const fillPath = `${accPath} L${xS(CHART_POINTS.length - 1).toFixed(1)},${(P.top + iH).toFixed(1)} L${P.left},${(P.top + iH).toFixed(1)} Z`;
 
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none"
      style={{ width: "100%", height: 160, display: "block" }}>
      {/* Grid lines */}
      {[60, 70, 80, 90, 100].map(v => (
        <line key={v} x1={P.left} x2={W - P.right} y1={aY(v)} y2={aY(v)} stroke="#1e2e1e" strokeWidth="1" />
      ))}
      {/* Left axis labels */}
      {[60, 70, 80, 90, 100].map(v => (
        <text key={v} x={P.left - 6} y={aY(v) + 4} textAnchor="end" fontSize="10" fill={C.textMute}>{v}%</text>
      ))}
      {/* Right axis labels */}
      {[1, 2, 3, 4].map(v => (
        <text key={v} x={W - P.right + 6} y={rY(v) + 4} textAnchor="start" fontSize="10" fill={C.textMute}>{v}x</text>
      ))}
      {/* Fill */}
      <path d={fillPath} fill="rgba(74,222,128,0.10)" />
      {/* Accuracy line */}
      <path d={accPath} fill="none" stroke={C.green} strokeWidth="2.5" strokeLinejoin="round" />
      {/* ROI line */}
      <path d={roiPath} fill="none" stroke={C.orange} strokeWidth="2" strokeDasharray="5,3" strokeLinejoin="round" />
      {/* Dots */}
      {CHART_POINTS.map((p, i) => (
        <circle key={`a${i}`} cx={xS(i)} cy={aY(p.acc)} r="3" fill={C.green} />
      ))}
      {CHART_POINTS.map((p, i) => (
        <circle key={`r${i}`} cx={xS(i)} cy={rY(p.roi)} r="3" fill={C.orange} />
      ))}
      {/* X labels every 2nd point */}
      {CHART_POINTS.filter((_, i) => i % 2 === 0).map((p, n) => (
        <text key={n} x={xS(n * 2)} y={H - 4} textAnchor="middle" fontSize="9" fill={C.textMute}>{p.day}</text>
      ))}
    </svg>
  );
}
 
// ─── Lock icon ────────────────────────────────────────────────────────────────
function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: 14, height: 14, fill: C.textMute, flexShrink: 0 }}>
      <path d="M12 1C9.24 1 7 3.24 7 6v2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V10a2 2 0 00-2-2h-2V6c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3v2H9V6c0-1.66 1.34-3 3-3zm0 9a2 2 0 110 4 2 2 0 010-4z" />
    </svg>
  );
}
 
// ─── Bet Slip Card ────────────────────────────────────────────────────────────
function BetSlipCard({ slip }: { slip: BetSlip }) {
  return (
    <div style={{
      background: C.bgCard, border: `1px solid ${C.border2}`,
      borderRadius: 16, overflow: "hidden", position: "relative",
    }}>
      {/* HOT PICK ribbon */}
      {slip.isHot && (
        <div style={{ position: "absolute", top: 0, right: 0, width: 72, height: 72, overflow: "hidden", zIndex: 10 }}>
          <div style={{
            background: C.yellow, color: "#000", fontSize: 9, fontWeight: 900,
            letterSpacing: "0.12em", textAlign: "center", padding: "4px 0",
            width: 100, transform: "rotate(45deg) translate(10px, -18px)",
            transformOrigin: "top right",
          }}>HOT PICK</div>
        </div>
      )}
 
      <div style={{ padding: "16px 18px" }}>
        {/* Bookmakers + countdown */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {slip.bookmakers.map(b => (
              <span key={b.name} style={{
                background: b.bg, color: "#fff", fontSize: 10, fontWeight: 700,
                padding: "2px 8px", borderRadius: 4,
              }}>{b.name}</span>
            ))}
          </div>
          <span style={{ color: C.green, fontSize: 11, fontFamily: "monospace", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, display: "inline-block" }} />
            {slip.countdown}
          </span>
        </div>
 
        {/* Odds + return */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 2 }}>
          <span style={{ color: C.textPri, fontSize: 32, fontWeight: 900, lineHeight: 1 }}>{slip.totalOdds.toFixed(2)}</span>
          <span style={{ color: C.green, fontSize: 11 }}>↑ {slip.estReturn}</span>
        </div>
        <p style={{ color: C.textMute, fontSize: 11, margin: "0 0 14px" }}>{slip.type} • {slip.sport}</p>
 
        {/* Selections */}
        <p style={{ color: C.textMute, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.14em", margin: "0 0 8px" }}>Selections</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {slip.selections.map((sel, i) =>
            sel.locked ? (
              <div key={i} style={{
                background: C.bgInner, border: `1px solid ${C.border}`,
                borderRadius: 10, padding: "8px 12px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                filter: "blur(3.5px)", userSelect: "none",
              }}>
                <div>
                  <p style={{ color: C.textPri, fontSize: 12, fontWeight: 600, margin: 0 }}>██████████████</p>
                  <p style={{ color: C.textSec, fontSize: 10, margin: 0 }}>████████</p>
                </div>
                <LockIcon />
              </div>
            ) : (
              <div key={i} style={{
                background: C.bgInner, border: `1px solid ${C.border}`,
                borderRadius: 10, padding: "8px 12px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div>
                  <p style={{ color: C.textPri, fontSize: 12, fontWeight: 600, margin: 0 }}>{sel.match}</p>
                  <p style={{ color: C.textSec, fontSize: 10, margin: 0 }}>{sel.market}</p>
                </div>
                <span style={{ color: C.green, fontWeight: 700, fontSize: 13 }}>{sel.odds.toFixed(2)}</span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
 
// ─── Main export ──────────────────────────────────────────────────────────────
export default function TipsterDetail() {
  const [range, setRange] = useState<"30D" | "90D" | "1Y">("30D");
 
  return (
    <div style={{ minHeight: "100vh", background: C.bgPage, color: C.textPri, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
 
      {/* ── NAV ── */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 24px", borderBottom: `1px solid ${C.border}`,
        background: C.bgPage, position: "sticky", top: 0, zIndex: 40,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 32, height: 32, background: C.green, borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: 14, color: "#000",
          }}>H</div>
          <span style={{ fontWeight: 700, fontSize: 15 }}>Hakika Tips</span>
        </div>
 
        {/* Breadcrumb — hidden on mobile via Tailwind */}
        <div className="hidden sm:flex" style={{ gap: 6, fontSize: 13, color: C.textSec, alignItems: "center" }}>
          <span style={{ cursor: "pointer" }}>Home</span>
          <span>/</span>
          <span style={{ cursor: "pointer" }}>Tipsters</span>
          <span>/</span>
          <span style={{ color: C.textPri }}>Mwangi Kamau</span>
        </div>
 
        <div style={{ display: "flex", gap: 8 }}>
          <button className="hidden sm:block" style={{
            border: `1px solid ${C.border2}`, background: "transparent", color: C.textPri,
            padding: "6px 16px", borderRadius: 8, fontSize: 13, cursor: "pointer",
          }}>Share</button>
          <button style={{
            background: C.green, color: "#000", fontWeight: 700,
            padding: "6px 16px", borderRadius: 8, fontSize: 13, cursor: "pointer", border: "none",
          }}>Subscribe</button>
        </div>
      </nav>
 
      {/* ── BODY ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 16px" }}>
 
        {/* ── PROFILE + CHART — stack on mobile, side-by-side on lg ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 20, marginBottom: 20 }}>
 
          {/* ── Profile card ── */}
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 18, padding: "20px 24px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 20 }}>
              {/* Avatar */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div style={{
                  width: 86, height: 86, borderRadius: "50%",
                  border: `2px solid ${C.green}`,
                  background: "radial-gradient(circle at 40% 40%, #1a3a1a, #0b140b)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26, fontWeight: 900, color: C.green,
                }}>MK</div>
                <div style={{
                  position: "absolute", bottom: -10, left: "50%", transform: "translateX(-50%)",
                  background: C.yellow, color: "#000", fontSize: 9, fontWeight: 900,
                  padding: "2px 8px", borderRadius: 99, whiteSpace: "nowrap",
                }}>#1 ELITE</div>
              </div>
 
              {/* Name / handle */}
              <div style={{ flex: 1, minWidth: 0, paddingTop: 4 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center",
                  background: C.bgInner, border: `1px solid ${C.border2}`,
                  borderRadius: 99, padding: "3px 10px", marginBottom: 8,
                }}>
                  <span style={{ fontSize: 11, color: C.textSec }}>⚽ Football • EPL • UCL</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <h1 style={{ fontSize: "clamp(18px, 4vw, 26px)", fontWeight: 900, color: C.textPri, margin: 0 }}>
                    Mwangi Kamau
                  </h1>
                  <span style={{
                    width: 22, height: 22, borderRadius: "50%", background: C.yellow,
                    color: "#000", fontSize: 11, fontWeight: 900,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>✓</span>
                </div>
                <p style={{ color: C.textMute, fontSize: 12, margin: "2px 0 0" }}>@mwangi_kamau • Member since Jan 2022</p>
              </div>
            </div>
 
            {/* Stats grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 16 }}>
              {[
                { value: "94%",   label: "ACCURACY",    color: C.green },
                { value: "2,481", label: "SUBSCRIBERS", color: C.green },
                { value: "1,847", label: "TOTAL TIPS",  color: C.textPri },
              ].map(s => (
                <div key={s.label}>
                  <p style={{ fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 900, color: s.color, margin: 0 }}>{s.value}</p>
                  <p style={{ fontSize: 9, color: C.textMute, textTransform: "uppercase", letterSpacing: "0.12em", margin: 0 }}>{s.label}</p>
                </div>
              ))}
            </div>
 
            {/* Avg return */}
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 900, color: C.green, margin: 0 }}>+TZS 287K</p>
              <p style={{ fontSize: 9, color: C.textMute, textTransform: "uppercase", letterSpacing: "0.12em", margin: 0 }}>AVG. RETURN</p>
            </div>
 
            {/* Verified pill */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: C.bgInner, border: `1px solid rgba(234,179,8,0.35)`,
              color: C.yellow, fontSize: 11, fontWeight: 700,
              padding: "6px 14px", borderRadius: 99,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.yellow, display: "inline-block" }} />
              ELITE VERIFIED TIPSTER
            </div>
          </div>
 
          {/* ── Performance Chart card ── */}
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 18, padding: "20px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: C.textSec }}>
                Performance — Last 30 Days
              </span>
              <div style={{ display: "flex", border: `1px solid ${C.border2}`, borderRadius: 8, overflow: "hidden" }}>
                {(["30D", "90D", "1Y"] as const).map(r => (
                  <button key={r} onClick={() => setRange(r)} style={{
                    padding: "4px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer", border: "none",
                    background: range === r ? C.bgHover : "transparent",
                    color: range === r ? C.green : C.textMute,
                    outline: range === r ? `1px solid ${C.green}` : "none",
                  }}>{r}</button>
                ))}
              </div>
            </div>
 
            {/* Legend */}
            <div style={{ display: "flex", gap: 16, marginBottom: 8 }}>
              {[{ color: C.green, label: "Accuracy %" }, { color: C.orange, label: "ROI x" }].map(l => (
                <span key={l.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: C.textSec }}>
                  <span style={{ width: 12, height: 12, border: `1.5px solid ${l.color}`, display: "inline-block", borderRadius: 2 }} />
                  {l.label}
                </span>
              ))}
            </div>
 
            <PerformanceChart />
          </div>
        </div>
 
        {/* ── LAST 10 RESULTS ── */}
        <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 18, padding: "20px 24px", marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: C.textSec, margin: "0 0 16px" }}>
            Last 10 Results
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            {LAST_10.map((r, i) => (
              <div key={i} style={{
                width: 40, height: 40, borderRadius: "50%", fontWeight: 900, fontSize: 13,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: `2px solid ${r === "W" ? C.green : C.red}`,
                color: r === "W" ? C.green : C.red,
                background: r === "W" ? "rgba(74,222,128,0.08)" : "rgba(239,68,68,0.08)",
              }}>{r}</div>
            ))}
            <div style={{
              background: C.bgInner, border: `1px solid ${C.border2}`,
              borderRadius: 12, padding: "8px 16px",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ color: C.green, fontWeight: 900, fontSize: 14 }}>8W-2L</span>
              <span style={{ color: C.textMute, fontSize: 11 }}>Last 10 • 6 win streak</span>
            </div>
          </div>
        </div>
 
        {/* ── ACTIVE BET SLIPS ── */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: C.textSec, margin: "0 0 16px" }}>
            Active Bet Slips
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3" style={{ gap: 16 }}>
            {BET_SLIPS.map(slip => <BetSlipCard key={slip.id} slip={slip} />)}
          </div>
        </div>
 
      </div>
    </div>
  );
}