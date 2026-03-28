function WinLossBar({ wins, losses }: { wins: number; losses: number }) {
  const total = wins + losses;
  const winPct = Math.round((wins / total) * 100);
  return (
    <div className="w-full">
      <div className="flex justify-between text-[10px] text-gray-600 mb-1">
        <span className="text-emerald-600">{wins}W</span>
        <span className="text-red-700">{losses}L</span>
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden flex">
        <div
          className="h-full bg-emerald-700/60 rounded-l-full"
          style={{ width: `${winPct}%` }}
        />
        <div className="h-full bg-red-900/50 rounded-r-full flex-1" />
      </div>
    </div>
  );
}

export default WinLossBar;
