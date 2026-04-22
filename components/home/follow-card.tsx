import AvatarCard from "./avatar";

interface FollowCardProps {
  tipster: FollowTipster;
}

function FollowCard({ tipster }: { tipster: TipSter }) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl p-3 hover:bg-white/5 transition-colors cursor-pointer"
      style={{
        background: "linear-gradient(135deg, #0d1f14 0%, #091510 100%)",
        border: "1px solid #1a3a24",
      }}
    >
      <AvatarCard
        initials={tipster.displayName.slice(0, 2).toUpperCase()}
        bg="#6B21A8"
        border={tipster.stats.accuracyPercentage > 80 ? "#22C55E" : "#6B21A8"}
        size="sm"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className="text-white text-sm font-semibold truncate">
            {tipster.displayName}
          </span>
          <span className="text-emerald-400 text-xs shrink-0">✓</span>
        </div>
        <p className="text-gray-500 text-[11px] truncate">{tipster.aiPersonality.preferredMarkets.join(',')}</p>
        <p className="text-gray-600 text-[10px]">{tipster.stats.totalBetSlips} Slips</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="text-emerald-400 font-bold text-sm">
          {tipster.stats.accuracyPercentage}%
        </span>
        <button className="text-xs px-3 py-1 rounded-lg border border-emerald-700/60 text-emerald-400 hover:bg-emerald-900/40 transition-colors whitespace-nowrap">
          Follow
        </button>
      </div>
    </div>
  );
}

export default FollowCard;
