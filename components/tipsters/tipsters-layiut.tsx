"use client";

import { RootState } from "@/lib/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import AllTipSters from "../home/all-tipsters";
import FollowList from "../home/follow-list";

interface FilterSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: string[];
}

const FilterSelect = ({ value, onChange, options }: FilterSelectProps) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="flex-1 min-w-30 px-3 py-2 rounded-xl bg-black/30 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-600 transition-colors appearance-none cursor-pointer"
  >
    {options.map((o) => (
      <option key={o} value={o}>
        {o}
      </option>
    ))}
  </select>
);

function TipStersLayout() {
  const [search, setSearch] = useState<string>("");
  const [sport, setSport] = useState<string>("All Sports");
  const [accuracy, setAccuracy] = useState<string>("Any Accuracy");
  const [tier, setTier] = useState<string>("All Tiers");
  const tipsters = useSelector((state: RootState) => state.tipsters.allTipsters);
  return (
    <div>
      <div
        className="rounded-2xl p-4 mb-8"
        style={{ background: "#0a1a10", border: "1px solid #1a3a24" }}
      >
        <div className="flex flex-col gap-3">
          {/* Search input */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              🔍
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tipsters by name..."
              className="w-full pl-9 pr-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-600 transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <FilterSelect
              value={sport}
              onChange={setSport}
              options={[
                "All Sports",
                "Football",
                "Basketball",
                "Tennis",
                "Rugby",
                "Cricket",
              ]}
            />
            <FilterSelect
              value={accuracy}
              onChange={setAccuracy}
              options={["Any Accuracy", "80%+", "85%+", "90%+"]}
            />
            <FilterSelect
              value={tier}
              onChange={setTier}
              options={["All Tiers", "Elite", "Pro", "Free"]}
            />
            <button
              className="px-5 py-2 rounded-xl font-semibold text-sm text-black transition-all hover:brightness-110 active:scale-95"
              style={{ backgroundColor: "#22C55E" }}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* <TipSterList /> */}
      <AllTipSters />
      <FollowList tipsters={tipsters.slice(4)} />
    </div>
  );
}

export default TipStersLayout;
