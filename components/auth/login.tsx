"use client";

import { login } from "@/lib/auth/auth";
import { AppDispatch, RootState } from "@/lib/store";
import { Sun } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

function LoginComponent() {

    const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleSubmit = async(e:React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!phone || !password) {
       
        toast.error("Tafadhali jaza nambari ya simu na nywila");
        return;
    }
    const formattedPhone = `+255${phone}`;
    const data = {
        username: phone,
        password
    }

    const res = await dispatch(login(data));
    if(login.fulfilled.match(res)) {
      router.push("/");
    }
  }
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
      {/* Glow blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#1a4a2e] opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#c9a227] opacity-10 blur-3xl pointer-events-none" />
 
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 mb-4 relative">
            {/* Shield logo placeholder — swap src for real logo */}
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-gray-200 to-gray-300 border-2 border-[#c9a227]/40 flex items-center justify-center shadow-[0_0_32px_rgba(201,162,39,0.2)]">
             <img src="/assets/tipster-logo.png" alt="Tip Ster Logo" className="h-16 object-cover" />
            </div>
          </div>
          <h1
            className="text-3xl font-black tracking-widest text-white uppercase"
            style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif", letterSpacing: "0.12em" }}
          >
            Hakika Tips
          </h1>
          <p className="text-[#c9a227] text-xs font-semibold tracking-[0.2em] uppercase mt-1 opacity-80">
            Ushauri wa Kubeti Wenye Uhakika
          </p>
        </div>
 
        {/* Card */}
        <div className="bg-[#0f1a0f]/80 backdrop-blur border border-[#1a4a2e]/60 rounded-2xl shadow-[0_8px_60px_rgba(0,0,0,0.6)] p-8">
          <h2 className="text-white text-xl font-bold mb-1">Karibu tena</h2>
          <p className="text-[#6b9e6b] text-sm mb-7">Ingia kwenye akaunti yako</p>
 
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-[#8ab88a] uppercase tracking-wider mb-2">
                Username
              </label>
              <div className="flex rounded-xl overflow-hidden border border-[#1a4a2e] focus-within:border-[#c9a227] transition-colors duration-200">
                {/* <span className="bg-[#1a4a2e]/60 text-[#c9a227] font-bold px-3 flex items-center text-sm border-r border-[#1a4a2e] select-none">
                  +255
                </span> */}
                <input
                  type="text"
                  placeholder="John_doe"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  // maxLength={9}
                  required
                  className="flex-1 bg-[#0d1a0d] text-white placeholder-[#3a5a3a] px-4 py-3 text-sm outline-none"
                />
              </div>
            </div>
 
            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-[#8ab88a] uppercase tracking-wider mb-2">
                Nywila
              </label>
              <div className="flex rounded-xl overflow-hidden border border-[#1a4a2e] focus-within:border-[#c9a227] transition-colors duration-200">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Weka nywila yako"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="flex-1 bg-[#0d1a0d] text-white placeholder-[#3a5a3a] px-4 py-3 text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="bg-[#0d1a0d] px-3 text-[#4a7a4a] hover:text-[#c9a227] transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
 
            {/* Remember me + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                    rememberMe ? "bg-[#c9a227] border-[#c9a227]" : "border-[#2a5a2a] bg-transparent"
                  }`}
                >
                  {rememberMe && (
                    <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-xs text-[#6b9e6b] group-hover:text-white transition-colors">Nikumbuke</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-[#c9a227] hover:text-[#f0c040] transition-colors font-medium"
              >
                Umesahau nywila?
              </Link>
            </div>
 
            {/* Submit */}
            <button
              type="submit"
              disabled={loading === "pending"}
              className="w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-200 relative overflow-hidden group"
              style={{
                background: loading === "pending"
                  ? "#1a4a2e"
                  : "linear-gradient(135deg, #c9a227 0%, #f0c040 50%, #c9a227 100%)",
                color: loading==='pending' ? "#4a7a4a" : "#0a0f0a",
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading==='pending' ? (
                  <Sun className="animate-spin text-[#4a7a4a]" size={16} />
                ) : (
                  "Ingia"
                )}
              </span>
            </button>
          </form>
 
          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#1a4a2e]" />
            <span className="text-[#3a5a3a] text-xs">au</span>
            <div className="flex-1 h-px bg-[#1a4a2e]" />
          </div>
 
          {/* Register */}
          <p className="text-center text-sm text-[#6b9e6b]">
            Huna akaunti?{" "}
            <Link
              href="/register"
              className="text-[#c9a227] font-bold hover:text-[#f0c040] transition-colors"
            >
              Jisajili sasa
            </Link>
          </p>
        </div>
 
        {/* Social proof */}
        <p className="text-center text-[#3a5a3a] text-xs mt-6">
          🔒 Watumiaji{" "}
          <span className="text-[#c9a227] font-semibold">50,000+</span>{" "}
          wanatuamini
        </p>
      </div>
    </div>
    )
}

export default LoginComponent
