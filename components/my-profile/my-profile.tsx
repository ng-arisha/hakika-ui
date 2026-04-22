"use client";

import { useState } from "react";
 
type Plan = "Monthly VIP" | "Monthly Pro" | "Weekly" | "Daily" | "Monthly Standard";
type Status = "active" | "expiring" | "expired";
 
interface WinLoss {
  result: "W" | "L";
}
 
interface Tipster {
  id: string;
  initials: string;
  name: string;
  plan: Plan;
  status: Status;
  renewLabel: string;
  winRate: number;
  last10: WinLoss[];
  avatarBg: string;
  avatarRing: string;
  isVIP?: boolean;
}
 
const tipsters: Tipster[] = [
  {
    id: "dk",
    initials: "DK",
    name: "DK Predictions",
    plan: "Monthly VIP",
    status: "active",
    renewLabel: "renews Mar 28",
    winRate: 80,
    last10: [
      { result: "W" }, { result: "W" }, { result: "L" }, { result: "W" },
      { result: "W" }, { result: "W" }, { result: "L" }, { result: "W" },
      { result: "W" }, { result: "W" },
    ],
    avatarBg: "#d97706",
    avatarRing: "#f59e0b",
    isVIP: true,
  },
  {
    id: "sb",
    initials: "SB",
    name: "SportsBrain TZ",
    plan: "Monthly Pro",
    status: "active",
    renewLabel: "renews Apr 2",
    winRate: 70,
    last10: [
      { result: "W" }, { result: "L" }, { result: "W" }, { result: "W" },
      { result: "L" }, { result: "W" }, { result: "W" }, { result: "L" },
      { result: "W" }, { result: "W" },
    ],
    avatarBg: "#2563eb",
    avatarRing: "#3b82f6",
  },
  {
    id: "fx",
    initials: "FX",
    name: "FootballXpert",
    plan: "Weekly",
    status: "expiring",
    renewLabel: "Expires in 2 days",
    winRate: 60,
    last10: [
      { result: "L" }, { result: "W" }, { result: "W" }, { result: "L" },
      { result: "W" }, { result: "W" }, { result: "L" }, { result: "W" },
      { result: "L" }, { result: "W" },
    ],
    avatarBg: "#dc2626",
    avatarRing: "#ef4444",
  },
  {
    id: "mg",
    initials: "MG",
    name: "MastermindGoals",
    plan: "Daily",
    status: "active",
    renewLabel: "renews tomorrow",
    winRate: 90,
    last10: [
      { result: "W" }, { result: "W" }, { result: "W" }, { result: "W" },
      { result: "L" }, { result: "W" }, { result: "W" }, { result: "W" },
      { result: "W" }, { result: "W" },
    ],
    avatarBg: "#7c3aed",
    avatarRing: "#8b5cf6",
  },
  {
    id: "tr",
    initials: "TR",
    name: "TipsterRoyale",
    plan: "Monthly Standard",
    status: "expired",
    renewLabel: "Expired Mar 10",
    winRate: 65,
    last10: [
      { result: "W" }, { result: "L" }, { result: "W" }, { result: "L" },
      { result: "W" }, { result: "W" }, { result: "L" }, { result: "W" },
      { result: "W" }, { result: "L" },
    ],
    avatarBg: "#b45309",
    avatarRing: "#d97706",
  },
  {
    id: "ka",
    initials: "KA",
    name: "KikaAnalyst",
    plan: "Weekly",
    status: "expired",
    renewLabel: "Expired Mar 5",
    winRate: 55,
    last10: [
      { result: "L" }, { result: "W" }, { result: "L" }, { result: "W" },
      { result: "W" }, { result: "L" }, { result: "W" }, { result: "L" },
      { result: "W" }, { result: "W" },
    ],
    avatarBg: "#0f766e",
    avatarRing: "#14b8a6",
  },
];
 
const planStyle: Record<Plan, { color: string; bg: string }> = {
  "Monthly VIP":      { color: "#fbbf24", bg: "rgba(251,191,36,0.13)" },
  "Monthly Pro":      { color: "#60a5fa", bg: "rgba(96,165,250,0.13)" },
  "Weekly":           { color: "#34d399", bg: "rgba(52,211,153,0.13)" },
  "Daily":            { color: "#a78bfa", bg: "rgba(167,139,250,0.13)" },
  "Monthly Standard": { color: "#fb923c", bg: "rgba(251,146,60,0.13)" },
};
 
const navItems = ["Home", "Subscriptions", "Tipsters", "Results"];
 
// ─── Win/Loss badge ────────────────────────────────────────────────────────────
function WinLossBadge({ result }: { result: "W" | "L" }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 28,
        height: 28,
        borderRadius: 5,
        fontSize: 11,
        fontWeight: 700,
        flexShrink: 0,
        backgroundColor: result === "W" ? "rgba(21,128,61,0.65)" : "rgba(153,27,27,0.65)",
        color: result === "W" ? "#86efac" : "#fca5a5",
      }}
    >
      {result}
    </span>
  );
}
 
// ─── Tipster Card ──────────────────────────────────────────────────────────────
function TipsterCard({ tipster }: { tipster: Tipster }) {
  const isExpired = tipster.status === "expired";
  const ps = planStyle[tipster.plan];
 
  const borderColor = tipster.isVIP
    ? "rgba(245,158,11,0.55)"
    : tipster.status === "expiring"
    ? "rgba(251,191,36,0.3)"
    : "rgba(51,65,85,0.8)";
 
  const statusColor =
    tipster.status === "active" ? "#4ade80" :
    tipster.status === "expiring" ? "#fbbf24" : "#f87171";
 
  const statusText =
    tipster.status === "active" ? `Active — ${tipster.renewLabel}` : tipster.renewLabel;
 
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 14,
        padding: 16,
        backgroundColor: "#161f2e",
        border: `1px solid ${borderColor}`,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      {/* VIP ribbon */}
      {tipster.isVIP && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: "#f59e0b",
            color: "#000",
            fontSize: 11,
            fontWeight: 800,
            padding: "4px 14px",
            borderRadius: "0 14px 0 10px",
            letterSpacing: "0.05em",
          }}
        >
          VIP
        </div>
      )}
 
      {/* Avatar + name */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, paddingRight: tipster.isVIP ? 52 : 0 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            backgroundColor: tipster.avatarBg,
            border: `2.5px solid ${tipster.avatarRing}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 700,
            fontSize: 13,
            flexShrink: 0,
          }}
        >
          {tipster.initials}
        </div>
        <div>
          <p style={{ color: "#f1f5f9", fontWeight: 600, fontSize: 14, margin: "0 0 5px 0" }}>
            {tipster.name}
          </p>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: ps.color,
              backgroundColor: ps.bg,
              padding: "2px 10px",
              borderRadius: 999,
            }}
          >
            {tipster.plan}
          </span>
        </div>
      </div>
 
      {/* Status */}
      <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12 }}>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: statusColor,
            flexShrink: 0,
          }}
        />
        <span style={{ color: statusColor }}>{statusText}</span>
      </div>
 
      {/* Last 10 */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ color: "#64748b", fontSize: 12 }}>Last 10</span>
          <span style={{ color: isExpired ? "#475569" : "#94a3b8", fontSize: 12, fontWeight: 600 }}>
            {tipster.winRate}% win rate
          </span>
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {tipster.last10.map((item, i) => (
            <WinLossBadge key={i} result={item.result} />
          ))}
        </div>
      </div>
 
      {/* Buttons */}
      <div style={{ display: "flex", gap: 8 }}>
        {/* View tips */}
        <button
          disabled={isExpired}
          style={{
            flex: 1,
            padding: "10px 0",
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
            border: isExpired ? "1px solid #1e293b" : "1px solid rgba(34,197,94,0.35)",
            backgroundColor: "transparent",
            color: isExpired ? "#334155" : "#4ade80",
            cursor: isExpired ? "not-allowed" : "pointer",
          }}
        >
          View tips
        </button>
 
        {/* Action button */}
        {isExpired ? (
          <button
            style={{
              flex: 1, padding: "10px 0", borderRadius: 10, fontSize: 13, fontWeight: 600,
              border: "1px solid rgba(245,158,11,0.45)",
              backgroundColor: "transparent", color: "#fbbf24", cursor: "pointer",
            }}
          >
            Resubscribe
          </button>
        ) : tipster.isVIP ? (
          <button
            style={{
              flex: 1, padding: "10px 0", borderRadius: 10, fontSize: 13, fontWeight: 600,
              border: "1px solid rgba(245,158,11,0.55)",
              backgroundColor: "transparent", color: "#fbbf24", cursor: "pointer",
            }}
          >
            Renew VIP
          </button>
        ) : tipster.status === "expiring" ? (
          <button
            style={{
              flex: 1, padding: "10px 0", borderRadius: 10, fontSize: 13, fontWeight: 600,
              border: "1px solid rgba(245,158,11,0.55)",
              backgroundColor: "transparent", color: "#fbbf24", cursor: "pointer",
            }}
          >
            Renew now
          </button>
        ) : (
          <button
            style={{
              flex: 1, padding: "10px 0", borderRadius: 10, fontSize: 13, fontWeight: 600,
              border: "1px solid #334155",
              backgroundColor: "transparent", color: "#64748b", cursor: "pointer",
            }}
          >
            Renew
          </button>
        )}
      </div>
    </div>
  );
}
 
// ─── Page ──────────────────────────────────────────────────────────────────────
type Tab = "active" | "expired" | "all";
 
export default function MySubscriptions() {
  const [activeTab, setActiveTab] = useState<Tab>("active");
 
  const activeTipsters  = tipsters.filter((t) => t.status !== "expired");
  const expiredTipsters = tipsters.filter((t) => t.status === "expired");
 
  const displayedTipsters =
    activeTab === "active"  ? activeTipsters  :
    activeTab === "expired" ? expiredTipsters :
    tipsters;
 
  const tabs: { key: Tab; label: string }[] = [
    { key: "active",  label: `Active (${activeTipsters.length})` },
    { key: "expired", label: `Expired (${expiredTipsters.length})` },
    { key: "all",     label: "All tipsters" },
  ];
 
  const stats = [
    { value: "4",        label: "Active subscriptions", color: "#4ade80" },
    { value: "74%",      label: "Avg win rate",          color: "#f1f5f9" },
    { value: "3",        label: "Renewing this week",    color: "#fbbf24" },
    { value: "TZS 14k",  label: "Monthly spend",         color: "#f1f5f9" },
  ];
 
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0d1117",
        color: "#f1f5f9",
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* ── Navbar ── */}
    
 
      {/* ── Content ── */}
      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "32px 20px 60px" }}>
 
        {/* Page header + tab switcher */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 28,
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(22px, 4vw, 28px)",
                fontWeight: 800,
                color: "#f8fafc",
              }}
            >
              My subscriptions
            </h1>
            <p style={{ margin: "6px 0 0", color: "#475569", fontSize: 14 }}>
              Manage your active tipster subscriptions
            </p>
          </div>
 
          {/* Tab pills */}
          <div
            style={{
              display: "flex",
              backgroundColor: "#161f2e",
              border: "1px solid #1e293b",
              borderRadius: 12,
              padding: 4,
              gap: 3,
              flexShrink: 0,
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: "none",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background-color 0.15s, color 0.15s",
                  backgroundColor: activeTab === tab.key ? "#1e293b" : "transparent",
                  color: activeTab === tab.key ? "#f1f5f9" : "#475569",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
 
        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 12,
            marginBottom: 32,
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                backgroundColor: "#161f2e",
                border: "1px solid #1e293b",
                borderRadius: 12,
                padding: "18px 20px",
              }}
            >
              <p style={{ margin: 0, fontSize: "clamp(26px,3.5vw,34px)", fontWeight: 800, color: s.color }}>
                {s.value}
              </p>
              <p style={{ margin: "5px 0 0", color: "#475569", fontSize: 12 }}>{s.label}</p>
            </div>
          ))}
        </div>
 
        {/* Section label */}
        <p
          style={{
            margin: "0 0 16px",
            fontSize: 11,
            fontWeight: 700,
            color: "#334155",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Subscribed Tipsters
        </p>
 
        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 310px), 1fr))",
            gap: 16,
          }}
        >
          {displayedTipsters.map((t) => (
            <TipsterCard key={t.id} tipster={t} />
          ))}
        </div>
      </main>
    </div>
  );
}