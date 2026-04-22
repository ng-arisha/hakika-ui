import Link from "next/link";
import AvatarCard from "./avatar";

const tierStyles: Record<TierType, { bg: string; text: string }> = {
  ELITE: { bg: "bg-purple-800", text: "text-purple-200" },
  PRO: { bg: "bg-yellow-900/60", text: "text-yellow-400" },
  FREE: { bg: "bg-emerald-900/60", text: "text-emerald-300" },
};

interface AccuracyBarProps {
  accuracy: number;
  color?: string;
}

const AccuracyBar = ({ accuracy, color = "#10B981" }: AccuracyBarProps) => (
  <div className="w-full h-1 rounded-full bg-white/10 mt-2 mb-1">
    <div
      className="h-1 rounded-full transition-all duration-700"
      style={{ width: `${accuracy}%`, backgroundColor: color }}
    />
  </div>
);

interface TierBadgeProps {
  tier: TierType;
}

const TierBadge = ({ tier }: TierBadgeProps) => {
  const styles = tierStyles[tier];
  return (
    <span
      className={`text-[10px] font-bold tracking-widest px-2 py-0.5 rounded ${styles.bg} ${styles.text}`}
    >
      {tier}
    </span>
  );
};
interface TopTipsterCardProps {
  tipster: TipSter;
  featured?: boolean;
}
function TopTipSterCard({ tipster, featured = false }: TopTipsterCardProps) {
  const borderColor = featured ? "#EAB308" : "#10B981";
  const accentColor = featured ? "#EAB308" : "#10B981";
  return (
    <div
      className="relative flex flex-col rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer"
      style={{
        background: "linear-gradient(145deg, #0f2318 0%, #0a1a10 100%)",
        border: `1.5px solid ${borderColor}`,
        boxShadow: featured ? `0 0 24px ${borderColor}30` : "none",
      }}
    >
      <Link
      href={`/tipsters/${tipster._id}`}
      className="flex flex-col items-center text-center gap-2">
        {/* <TierBadge tier={tipster.tier} /> */}
        <AvatarCard
          initials={tipster.displayName.slice(0, 2).toUpperCase()}
          bg="#6B21A8"
          border={accentColor}
          size="lg"
        />
        <div>
          <div className="flex items-center justify-center gap-1">
            <span className="font-bold text-white text-[15px]">
              {tipster.displayName}
            </span>
            <span className="text-emerald-400 text-sm">✓</span>
          </div>
          <p className="text-gray-400 text-xs mt-0.5">{tipster.aiPersonality.preferredMarkets.join(",")}</p>
        </div>
      </Link>

      <AccuracyBar accuracy={tipster.stats.accuracyPercentage} color={accentColor} />

      <div className="grid grid-cols-3 gap-1 text-center mt-2 mb-4">
        <div>
          <p className="font-bold text-sm" style={{ color: accentColor }}>
            {tipster.stats.accuracyPercentage}%
          </p>
          <p className="text-gray-500 text-[10px]">Accuracy</p>
        </div>
        <div>
          <p className="font-bold text-sm text-white">{tipster.stats.subscriberCount}</p>
          <p className="text-gray-500 text-[10px]">Subs</p>
        </div>
        <div>
          <p className="font-bold text-sm text-emerald-400">
            {tipster.stats.totalBetSlips}
          </p>
          <p className="text-gray-500 text-[10px]">Slips</p>
        </div>
      </div>

      {/* {tipster.free ? (
        <button className="w-full py-2.5 rounded-xl font-semibold text-sm text-emerald-400 border border-emerald-700/50 bg-emerald-950/50 hover:bg-emerald-900/40 transition-colors">
          Follow Free
        </button>
      ) : (
        <button
          className="w-full py-2.5 rounded-xl font-semibold text-sm transition-all hover:brightness-110 active:scale-95"
          style={{
            border: `1px solid ${accentColor}40`,
            color: accentColor,
            backgroundColor: featured ? "#1a120050" : "#0a2a1a50",
          }}
        >
          Subscribe · {tipster.price}
        </button>
      )} */}
    </div>
  );
}

export default TopTipSterCard;
