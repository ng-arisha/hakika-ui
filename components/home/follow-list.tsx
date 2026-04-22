import FollowCard from "./follow-card"

function FollowList({tipsters}:{tipsters: TipSter[]}) {
    return (
        <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            🔔 Tipsters to{" "}
            <span style={{ color: "#22C55E" }}>Follow</span>
          </h2>
          <a href="#" className="text-sm font-medium hover:text-white transition-colors" style={{ color: "#22C55E" }}>
            View all 140+ tipsters →
          </a>
        </div>

        {/* 1-col on mobile → 2-col on sm → 4-col on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {tipsters.map((tipster) => (
            <FollowCard key={tipster._id} tipster={tipster} />
          ))}
        </div>
      </section>
    )
}

export default FollowList
