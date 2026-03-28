import { tipsters } from "@/utils/data"
import TopTipsterCard from "./top-tipster-card"

function TipSterList() {
    return (
        <section className="my-5">
            <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              🏆 Top{" "}
              <span style={{ color: "#22C55E" }}>Tipsters</span>{" "}
              This Week
            </h2>
            <a href="#" className="text-sm font-medium hover:text-white transition-colors" style={{ color: "#22C55E" }}>
              See all tipsters →
            </a>
          </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {tipsters.map((t, i) => (
          <TopTipsterCard key={t.id} tipster={t} featured={i === 0} />
        ))}
      </div>
        </section>

    )
}

export default TipSterList
