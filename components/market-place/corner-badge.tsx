
interface CornerBadgeProps {
    badge: NonNullable<BetSlip["badge"]>;
    color: string;
  }


function CornerBadge({ badge, color }: CornerBadgeProps) {
    const textColor = badge === "FREE" ? "#fff" : "#000";
    return (
        <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl pointer-events-none">
      <div
        className="absolute top-4 -right-5.5 w-28 text-center text-[10px] font-black tracking-widest py-1 rotate-45"
        style={{ background: color, color: textColor }}
      >
        {badge}
      </div>
    </div>
    )
}

export default CornerBadge
