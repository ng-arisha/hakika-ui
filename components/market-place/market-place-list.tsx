"use client";

import { BET_SLIPS, MOBILE_FILTERS } from "@/utils/data";
import { useState } from "react";
import BetSlipCard from "./betslip-card";
import FilterSideBar from "./filter-side-bar";

function MarketPlaceList() {
    const [activeMobileFilter, setActiveMobileFilter] = useState<string>("All Slips");
    const [activeSport, setActiveSport] = useState<SportFilter>("All");
  const [activeAccuracy, setActiveAccuracy] = useState<AccuracyFilter>("Any accuracy");
  const [sortBy, setSortBy] = useState<SortOption>("Hottest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const filteredSlips = BET_SLIPS.filter((s) => {
    if (activeSport !== "All" && s.sport !== activeSport) return false;
    return true;
  });
    return (
        <div>
          <div
        className="lg:hidden border-b sticky top-14"
        style={{ background: "#050c06", borderColor: "#1a2e1d" }}
      >
        <div className="flex overflow-x-auto no-scrollbar px-4 gap-2 py-3">
          {MOBILE_FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActiveMobileFilter(f)}
              className="shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 active:scale-95"
              style={
                activeMobileFilter === f
                  ? { background: "#22c55e", color: "#000" }
                  : { background: "#0a160c", color: "#6b7280", border: "1px solid #1a2e1d" }
              }
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-6">
          <FilterSideBar
            activeSport={activeSport}
            setActiveSport={setActiveSport}
            activeAccuracy={activeAccuracy}
            setActiveAccuracy={setActiveAccuracy}
          />
 
          <main className="flex-1 min-w-0">
            {/* Heading + controls */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  Bet Slip{" "}
                  <span style={{ color: "#22c55e" }}>Marketplace</span>
                </h1>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{
                    background: "#0f1f12",
                    color: "#22c55e",
                    border: "1px solid #1a2e1d",
                  }}
                >
                  {filteredSlips.length * 8} slips available
                </span>
              </div>
 
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="text-xs font-semibold px-3 py-2 rounded-xl cursor-pointer outline-none appearance-none"
                  style={{
                    background: "#0a160c",
                    color: "#e5e7eb",
                    border: "1px solid #1a2e1d",
                  }}
                >
                  {(
                    [
                      "Hottest",
                      "Newest",
                      "Highest Odds",
                      "Lowest Price",
                      "Best Accuracy",
                    ] as SortOption[]
                  ).map((o) => (
                    <option key={o} value={o}>
                      Sort: {o}
                    </option>
                  ))}
                </select>
 
                <div
                  className="flex rounded-xl overflow-hidden"
                  style={{ border: "1px solid #1a2e1d" }}
                >
                  {(["grid", "list"] as ViewMode[]).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setViewMode(mode)}
                      className="px-3 py-2 text-sm transition-all duration-150"
                      style={
                        viewMode === mode
                          ? { background: "#22c55e", color: "#000" }
                          : { background: "#0a160c", color: "#4b5563" }
                      }
                    >
                      {mode === "grid" ? "⊞" : "☰"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
 
            {/* Promo banner */}
            <div
              className="rounded-2xl p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              style={{
                background: "linear-gradient(135deg, #0f2110 0%, #0a1a0c 100%)",
                border: "1px solid #22c55e28",
              }}
            >
              <div className="min-w-0">
                <p className="text-yellow-400 text-xs font-bold tracking-widest uppercase mb-1.5 flex items-center gap-1.5">
                  🏆 Limited Offer
                </p>
                <p className="text-white font-black text-base sm:text-lg leading-snug">
                  Subscribe to any Elite Tipster — Get 3 Months Free Access
                </p>
                <p className="text-gray-500 text-xs mt-1.5">
                  Premium slips from Kenya & Tanzania's top verified analysts. Cancel anytime.
                </p>
              </div>
              <button
                type="button"
                className="shrink-0 px-5 py-2.5 rounded-xl font-black text-sm whitespace-nowrap transition-all hover:brightness-110 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  color: "#000",
                  boxShadow: "0 4px 20px #f59e0b28",
                }}
              >
                Claim Offer →
              </button>
            </div>
 
            {/* Cards */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                  : "flex flex-col gap-4"
              }
            >
              {filteredSlips.map((slip) => (
                <BetSlipCard key={slip.id} slip={slip} />
              ))}
            </div>
          </main>
        </div>
      </div>
        </div>
    )
}

export default MarketPlaceList
