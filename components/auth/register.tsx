"use client";

import { register } from "@/lib/auth/auth";
import { AppDispatch, RootState } from "@/lib/store";
import { SunIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

type Step = 1 | 2 | 3;

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5 mb-6">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1 rounded-full transition-all duration-500 ${
            i + 1 < current
              ? "bg-[#c9a227] flex-1"
              : i + 1 === current
              ? "bg-[#c9a227] flex-2"
              : "bg-[#1a4a2e] flex-1"
          }`}
        />
      ))}
    </div>
  );
}
const AVATARS = ["🦁", "🐆", "🦅", "🦊", "🐉", "⚡", "🔥", "💎"];
function RegisterComponent() {
  const [step, setStep] = useState<Step>(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(120);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [avatar, setAvatar] = useState("🦁");
  const [isLoading, setIsLoading] = useState(false);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleRegister = async () => {
    if (!phone || !password || !confirm || !displayName) {
      toast.error("Tafadhali jaza taarifa zote");
      return;
    }

    const data = {
      name: phone,
      password,
      username: displayName,
    };
    const res = await dispatch(register(data));
    if (register.fulfilled.match(res)) {
      router.push("/");
    }
  };

  const next = () => {
    if (!phone || !password || !confirm) {
      toast.error("Tafadhali jaza taarifa zote");
      return;
    }
    if (step === 2 && !displayName) {
      toast.error("Tafadhali jaza jina la kuonyesha");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep((s) => (s < 3 ? ((s + 1) as Step) : s));
    }, 800);
  };
  return (
    <div className="min-h-screen bg-[#0a0f0a] flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #c9a227 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute -top-15 -right-15 w-64 h-64 rounded-full bg-[#1a4a2e] opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-15 -left-15 w-64 h-64 rounded-full bg-[#c9a227] opacity-10 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-7">
          <div className="w-20 h-20 rounded-full bg-linear-to-br from-gray-200 to-gray-300 border-2 border-[#c9a227]/40 flex items-center justify-center shadow-[0_0_32px_rgba(201,162,39,0.2)]">
            <img
              src="/assets/tipster-logo.png"
              alt="Tip Ster Logo"
              className="h-16 object-cover"
            />
          </div>
          <h1
            className="text-2xl font-black tracking-widest text-white uppercase"
            style={{
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              letterSpacing: "0.12em",
            }}
          >
            Hakika Tips
          </h1>
        </div>

        {/* Card */}
        <div className="bg-[#0f1a0f]/80 backdrop-blur border border-[#1a4a2e]/60 rounded-2xl shadow-[0_8px_60px_rgba(0,0,0,0.6)] p-8">
          <StepIndicator current={step} total={3} />

          {/* ── STEP 1: Phone ── */}
          {step === 1 && (
            <div>
              <h2 className="text-white text-xl font-bold mb-1">Jisajili</h2>
              {/* <p className="text-[#6b9e6b] text-sm mb-6">
                Tutakutumia nambari ya uthibitisho kupitia SMS
              </p> */}
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-[#8ab88a] uppercase tracking-wider mb-2">
                    Jina
                  </label>
                  <div className="flex rounded-xl overflow-hidden border border-[#1a4a2e] focus-within:border-[#c9a227] transition-colors duration-200">
                    {/* <span className="bg-[#1a4a2e]/60 text-[#c9a227] font-bold px-3 flex items-center text-sm border-r border-[#1a4a2e] select-none">
                      +255
                    </span> */}
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      // maxLength={9}
                      className="flex-1 bg-[#0d1a0d] text-white placeholder-[#3a5a3a] px-4 py-3 text-sm outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-[#8ab88a] uppercase tracking-wider mb-2 mt-2">
                      Nywila Mpya
                    </label>
                    <div className="flex rounded-xl overflow-hidden border border-[#1a4a2e] focus-within:border-[#c9a227] transition-colors">
                      <input
                        type={showPw ? "text" : "password"}
                        placeholder="Nywila yako..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="flex-1 bg-[#0d1a0d] text-white placeholder-[#3a5a3a] px-4 py-3 text-sm outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw(!showPw)}
                        className="bg-[#0d1a0d] px-3 text-[#4a7a4a] hover:text-[#c9a227] transition-colors"
                      >
                        {showPw ? "👁️" : "🙈"}
                      </button>
                    </div>
                    {/* <PasswordStrength password={password} /> */}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-[#8ab88a] uppercase tracking-wider mb-2 mt-2">
                      Thibitisha Nywila
                    </label>
                    <div className="flex rounded-xl overflow-hidden border border-[#1a4a2e] focus-within:border-[#c9a227] transition-colors">
                      <input
                        type="password"
                        placeholder="Rudia nywila..."
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        className="flex-1 bg-[#0d1a0d] text-white placeholder-[#3a5a3a] px-4 py-3 text-sm outline-none"
                      />
                      {confirm && (
                        <span className="bg-[#0d1a0d] px-3 flex items-center text-sm">
                          {confirm === password ? "✅" : "❌"}
                        </span>
                      )}
                    </div>
                    {confirm && confirm !== password && (
                      <p className="text-red-400 text-xs mt-1">
                        Nywila hazilingani
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={next}
                  className="w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                  style={{
                    background:
                      "linear-gradient(135deg, #c9a227 0%, #f0c040 50%, #c9a227 100%)",
                    color: "#0a0f0a",
                  }}
                >
                  {isLoading ? "Loading..." : "Endelea →"}
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: OTP ── */}

          {/* ── STEP 4: Profile ── */}
          {step === 2 && (
            <div>
              <h2 className="text-white text-xl font-bold mb-1">
                Jina na Picha
              </h2>
              <p className="text-[#6b9e6b] text-sm mb-6">
                Hatua hii si lazima — unaweza kuruka
              </p>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-[#8ab88a] uppercase tracking-wider mb-2">
                    Jina la Kuonyesha
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Simba wa Dau"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full bg-[#0d1a0d] text-white placeholder-[#3a5a3a] px-4 py-3 text-sm outline-none border border-[#1a4a2e] focus:border-[#c9a227] rounded-xl transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#8ab88a] uppercase tracking-wider mb-3">
                    Chagua Avatar
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {AVATARS.map((a) => (
                      <button
                        key={a}
                        onClick={() => setAvatar(a)}
                        className={`h-12 rounded-xl text-2xl border-2 transition-all ${
                          avatar === a
                            ? "border-[#c9a227] bg-[#1a4a2e] shadow-[0_0_12px_rgba(201,162,39,0.3)]"
                            : "border-[#1a4a2e] bg-[#0d1a0d] hover:border-[#2a6a2a]"
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={next}
                  className="w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest transition-all"
                  style={{
                    background:
                      "linear-gradient(135deg, #c9a227 0%, #f0c040 50%, #c9a227 100%)",
                    color: "#0a0f0a",
                  }}
                >
                  Endelea →
                </button>
                <button
                  onClick={next}
                  className="w-full text-xs text-[#4a7a4a] hover:text-[#c9a227] transition-colors py-1"
                >
                  Ruka Hatua Hii
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 5: Welcome ── */}
          {step === 3 && (
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-linear-to-br from-[#1a4a2e] to-[#0d2218] border-2 border-[#c9a227] flex items-center justify-center shadow-[0_0_32px_rgba(201,162,39,0.3)] text-4xl">
                {avatar}
              </div>
              <div className="inline-flex items-center gap-1 bg-[#c9a227]/10 border border-[#c9a227]/30 rounded-full px-3 py-1 mb-4">
                <span className="text-[#c9a227] text-xs font-bold">
                  ✓ Akaunti Imefunguliwa
                </span>
              </div>
              <h2 className="text-white text-xl font-bold mb-2">
                Karibu, {displayName || `+255 ${phone.slice(0, 3)}...`}!
              </h2>
              <p className="text-[#6b9e6b] text-sm mb-8">
                Uko tayari kupata ushauri wa kubeti wenye uhakika. Tafuta
                tipsters bora na uanze leo!
              </p>

              <div className="grid grid-cols-3 gap-3 mb-7">
                {[
                  { icon: "🎯", label: "Tazama Tipsters" },
                  { icon: "🎟️", label: "Nunua Betslip" },
                  { icon: "📊", label: "Angalia Takwimu" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-[#0d1a0d] border border-[#1a4a2e] rounded-xl p-3 text-center"
                  >
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <p className="text-[#8ab88a] text-xs">{item.label}</p>
                  </div>
                ))}
              </div>

              {
                loading === 'pending' ? (
                  <div className="flex justify-center items-center">
                    <SunIcon className="text-green-500 animate-spin" size={24}/>
                  </div>
                ):(
                  <button
              
                onClick={handleRegister}
                className="block w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest text-center transition-all"
                style={{
                  background:
                    "linear-gradient(135deg, #c9a227 0%, #f0c040 50%, #c9a227 100%)",
                  color: "#0a0f0a",
                }}
              >
                Anza Sasa 🚀
              </button>
                )
              }
            </div>
          )}
        </div>

        {/* Login link */}
        {step < 5 && (
          <p className="text-center text-[#6b9e6b] text-xs mt-6">
            Una akaunti tayari?{" "}
            <Link
              href="/login"
              className="text-[#c9a227] font-bold hover:text-[#f0c040] transition-colors"
            >
              Ingia hapa
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default RegisterComponent;
