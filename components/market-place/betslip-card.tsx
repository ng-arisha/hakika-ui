import { PLATFORM_STYLES, SPORT_ICON } from "@/utils/data";
import { useState } from "react";
import AccuracyBadge from "./accuracy-badge";
import CornerBadge from "./corner-badge";
import TimerangeBadge from "./time-range-badge";

interface BetSlipCardProps {
    slip: BetSlip;
  }

function BetSlipCard({ slip }: BetSlipCardProps) {
    const [hovered, setHovered] = useState(false);
    return (
        <article
        className="relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer flex flex-col"
        style={{
          background: "linear-gradient(145deg, #0f1f12 0%, #0a160c 100%)",
          border: hovered ? "1px solid #22c55e55" : "1px solid #1a2e1d",
          boxShadow: hovered
            ? "0 0 30px #22c55e12, 0 8px 32px #00000060"
            : "0 4px 20px #00000040",
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {slip.badge && slip.badgeColor && (
          <CornerBadge badge={slip.badge} color={slip.badgeColor} />
        )}
   
        {/* Header */}
        <div className="p-4 pb-3">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white shrink-0"
                style={{ background: slip.avatarBg }}
              >
                {slip.initials}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-bold text-sm truncate">{slip.name}</span>
                  {slip.verified && (
                    <span className="text-green-400 text-xs shrink-0">✓</span>
                  )}
                </div>
                <div className="text-[11px] text-gray-500 truncate">
                  {SPORT_ICON[slip.sport]} {slip.sport} • {slip.leagues}
                </div>
              </div>
            </div>
            <AccuracyBadge value={slip.accuracy} />
          </div>
   
          <div className="flex items-end justify-between gap-2">
            <div>
              <div
                className="text-4xl font-black tracking-tight leading-none"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #86efac 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {slip.odds}
              </div>
              <div className="text-gray-500 text-xs mt-1">{slip.type}</div>
            </div>
            <TimerangeBadge timer={slip.timer} urgent={slip.timerUrgent} />
          </div>
        </div>
   
        {/* Divider */}
        <div className="mx-4 h-px bg-linear-to-r from-transparent via-green-900/50 to-transparent" />
   
        {/* Selections */}
        <div className="p-4 pt-3 flex flex-col flex-1">
          <div className="text-[10px] font-bold tracking-widest text-gray-600 mb-2.5 uppercase">
            Selections
          </div>
   
          <div className="space-y-2 flex-1">
            {slip.selections.map((sel, i) =>
              sel.locked ? (
                <div
                  key={i}
                  className="flex items-center justify-between px-2.5 py-1.5 rounded-lg"
                  style={{ background: "#ffffff06" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 text-sm">🔒</span>
                    <div className="h-2.5 w-24 rounded-full bg-gray-800" />
                  </div>
                  <div className="h-2.5 w-8 rounded-full bg-gray-800" />
                </div>
              ) : (
                <div key={i} className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-white text-xs font-semibold truncate">{sel.match}</div>
                    <div className="text-gray-500 text-[11px]">{sel.market}</div>
                  </div>
                  <span className="text-green-400 font-bold text-sm shrink-0">{sel.odd}</span>
                </div>
              )
            )}
          </div>
   
          {/* Platforms */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {slip.platforms.map((p) => (
              <span
                key={p}
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${PLATFORM_STYLES[p]}`}
              >
                {p}
              </span>
            ))}
          </div>
   
          {/* Footer */}
          <div className="flex items-center justify-between mt-4 gap-2">
            <div className="min-w-0">
              {slip.isFree ? (
                <span className="text-green-400 font-black text-xl">FREE</span>
              ) : (
                <>
                  <div className="text-white font-black text-base truncate">{slip.price}</div>
                  <div className="text-gray-600 text-[10px]">{slip.priceLabel}</div>
                </>
              )}
            </div>
            <button
              type="button"
              className="px-4 py-2 rounded-xl text-xs font-black tracking-wider transition-all duration-200 active:scale-95 hover:brightness-110 shrink-0"
              style={
                slip.isFree
                  ? { background: "#8b5cf6", color: "#fff", boxShadow: "0 4px 14px #8b5cf640" }
                  : {
                      background: "linear-gradient(135deg, #22c55e, #16a34a)",
                      color: "#000",
                      boxShadow: "0 4px 14px #22c55e28",
                    }
              }
            >
              VIEW BETSLIP
            </button>
          </div>
        </div>
      </article>
    )
}

export default BetSlipCard
