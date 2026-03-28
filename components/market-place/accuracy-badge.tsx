
interface AccuracyBadgeProps {
    value: number;
  }


function AccuracyBadge({ value }: AccuracyBadgeProps) {
    const color = value >= 90 ? "#22c55e" : value >= 80 ? "#f59e0b" : "#94a3b8";
    return (
        <span
      className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0"
      style={{ color, background: `${color}22`, border: `1px solid ${color}44` }}
    >
      {value}%
    </span>
    )
}

export default AccuracyBadge
