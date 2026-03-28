"use client";

import { ACCURACY_OPTIONS, PLATFORM_STYLES, SPORT_FILTERS } from "@/utils/data";
import { useState } from "react";

interface FilterSidebarProps {
    activeSport: SportFilter;
    setActiveSport: (s: SportFilter) => void;
    activeAccuracy: AccuracyFilter;
    setActiveAccuracy: (a: AccuracyFilter) => void;
  }

function FilterSideBar({
    activeSport,
    setActiveSport,
    activeAccuracy,
    setActiveAccuracy,
  }: FilterSidebarProps) {
    const [liveOnly, setLiveOnly] = useState(true);
  const [oddsRange, setOddsRange] = useState(35);
  const [priceRange, setPriceRange] = useState(20000);
  const activePlatforms: Platform[] = ["Sportpesa", "Betin", "Betway"];
    return (
        <aside className="hidden lg:block w-56 shrink-0">
      <div
        className="rounded-2xl p-5 sticky top-20"
        style={{ background: "#0a160c", border: "1px solid #1a2e1d" }}
      >
        {/* Title row */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-white font-bold text-sm tracking-widest uppercase">Filters</span>
          <button
            type="button"
            className="text-green-400 text-xs font-semibold hover:text-green-300 transition-colors"
            onClick={() => {
              setActiveSport("All");
              setActiveAccuracy("Any accuracy");
            }}
          >
            Reset All
          </button>
        </div>
 
        {/* Live toggle */}
        <div
          className="flex items-center justify-between mb-5 p-3 rounded-xl"
          style={{ background: "#0f1f12", border: "1px solid #1a2e1d" }}
        >
          <span className="text-gray-300 text-xs font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Live & Upcoming
          </span>
          <button
            type="button"
            onClick={() => setLiveOnly(!liveOnly)}
            className="w-9 h-5 rounded-full relative transition-all duration-300"
            style={{ background: liveOnly ? "#22c55e" : "#1a2e1d" }}
          >
            <div
              className="w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 shadow-sm transition-all duration-300"
              style={{ left: liveOnly ? "calc(100% - 18px)" : "2px" }}
            />
          </button>
        </div>
 
        {/* Sport type */}
        <div className="mb-5">
          <p className="text-[10px] font-bold tracking-widest text-gray-600 uppercase mb-2.5">
            Sport Type
          </p>
          <div className="flex flex-wrap gap-1.5">
            {SPORT_FILTERS.map(({ label, icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => setActiveSport(label)}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-150 hover:brightness-110"
                style={
                  activeSport === label
                    ? { background: "#22c55e", color: "#000" }
                    : { background: "#0f1f12", color: "#9ca3af", border: "1px solid #1a2e1d" }
                }
              >
                {icon ? `${icon} ${label}` : label}
              </button>
            ))}
          </div>
        </div>
 
        {/* Total odds */}
        <div className="mb-5">
          <p className="text-[10px] font-bold tracking-widest text-gray-600 uppercase mb-2.5">
            Total Odds Range
          </p>
          <input
            type="range"
            min={1}
            max={35}
            value={oddsRange}
            onChange={(e) => setOddsRange(Number(e.target.value))}
            className="w-full h-1 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: "#22c55e" }}
          />
          <div className="flex justify-between text-[10px] text-gray-600 mt-1">
            <span>1.00</span>
            <span>Up to {oddsRange}.00</span>
          </div>
        </div>
 
        {/* Price */}
        <div className="mb-5">
          <p className="text-[10px] font-bold tracking-widest text-gray-600 uppercase mb-2.5">
            Price (TZS)
          </p>
          <input
            type="range"
            min={0}
            max={20000}
            step={500}
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full h-1 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: "#22c55e" }}
          />
          <div className="flex justify-between text-[10px] text-gray-600 mt-1">
            <span>Free</span>
            <span>Up to {priceRange.toLocaleString()}</span>
          </div>
        </div>
 
        {/* Accuracy */}
        <div className="mb-5">
          <p className="text-[10px] font-bold tracking-widest text-gray-600 uppercase mb-2.5">
            Tipster Accuracy
          </p>
          <div className="space-y-1.5">
            {ACCURACY_OPTIONS.map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                <button
                  type="button"
                  onClick={() => setActiveAccuracy(opt)}
                  className="w-4 h-4 rounded flex items-center justify-center shrink-0 transition-all"
                  style={
                    activeAccuracy === opt
                      ? { background: "#22c55e" }
                      : { background: "#0f1f12", border: "1px solid #2d4a2d" }
                  }
                >
                  {activeAccuracy === opt && (
                    <span className="text-black text-[9px] font-black">✓</span>
                  )}
                </button>
                <span className="text-gray-400 text-xs group-hover:text-white transition-colors">
                  {opt}
                </span>
              </label>
            ))}
          </div>
        </div>
 
        {/* Platforms */}
        <div>
          <p className="text-[10px] font-bold tracking-widest text-gray-600 uppercase mb-2.5">
            Betting Platform
          </p>
          <div className="flex flex-wrap gap-1.5">
            {activePlatforms.map((p) => (
              <span
                key={p}
                className={`text-[10px] font-semibold px-2 py-1 rounded-lg border cursor-pointer hover:brightness-125 transition-all ${PLATFORM_STYLES[p]}`}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
    )
}

export default FilterSideBar
