


interface TimerBadgeProps {
    timer: string;
    urgent: boolean;
  }
function TimerangeBadge({ timer, urgent }: TimerBadgeProps) {
    const color = urgent ? "#ef4444" : "#f59e0b";
    return (
        <span
      className="flex items-center gap-1.5 text-xs font-mono font-semibold px-2.5 py-1 rounded-lg shrink-0"
      style={{
        background: urgent ? "#ef444418" : "#f59e0b15",
        color,
        border: `1px solid ${color}30`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full animate-pulse"
        style={{ background: color }}
      />
      {timer}
    </span>
    )
}

export default TimerangeBadge
