function AccuracyBar({value,tier}:{value:number,tier:string}) {
    const isVip = tier === "vip";
    return (
        <div className="w-full">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[11px] text-gray-500 tracking-wide uppercase">Accuracy</span>
        <span className={`text-xs font-semibold ${isVip ? "text-[#C9A84C]" : "text-emerald-400"}`}>
          {value}%
        </span>
      </div>
      <div className="h-1.25 w-full bg-white/6 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${value}%`,
            background: isVip
              ? "linear-gradient(90deg, #1A5C42, #C9A84C)"
              : "linear-gradient(90deg, #166534, #4ade80)",
          }}
        />
      </div>
    </div>
    )
}

export default AccuracyBar
