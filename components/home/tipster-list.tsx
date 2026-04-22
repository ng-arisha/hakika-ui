"use client";

import { AppDispatch, RootState } from "@/lib/store";
import { findTopTipsters } from "@/lib/tipsters/tipster";
import { SunIcon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopTipsterCard from "./top-tipster-card";

function TipSterList() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.tipsters.loading);
  const tipsters = useSelector((state: RootState) => state.tipsters.tipsters);

  useEffect(() => {
    dispatch(findTopTipsters());
  }, [])
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
           {
            loading === 'pending' ? (
              <div className="h-24 flex justify-center items-center flex-col w-full">
                <SunIcon className="animate-spin text-gray-500" size={24} />
              </div>
            ):(
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
              {tipsters.map((tipster, i) => (
                <TopTipsterCard key={tipster._id} tipster={tipster} featured={i === 0} />
              ))}
            </div>
            )
           }
        </section>

    )
}

export default TipSterList
