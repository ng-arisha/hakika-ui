
interface AvatarProps {
    initials: string;
    bg: string;
    border: string;
    size?: "sm" | "md" | "lg";
  }

function AvatarCard({ initials, bg, border, size = "md" }: AvatarProps) {
    const sizes: Record<NonNullable<AvatarProps["size"]>, string> = {
        sm: "w-10 h-10 text-sm",
        md: "w-14 h-14 text-lg",
        lg: "w-16 h-16 text-xl",
      };
    return (
        <div
        className={`${sizes[size]} rounded-full flex items-center justify-center font-bold text-white border-2 shrink-0`}
        style={{ backgroundColor: bg, borderColor: border }}
      >
        {initials}
      </div>
    )
}

export default AvatarCard
