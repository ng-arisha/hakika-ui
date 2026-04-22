"use client";

import { RootState } from "@/lib/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import MyInfo from "./my-info";
import MySubscriptions from "./my-profile";


function MyProfileDisplay() {
    const [profileTab, setProfileTab] = useState<ProfileTab>("subscriptions");
    const user = useSelector((state: RootState) => state.auth.user);
 
  const profileTabs: { key: ProfileTab; label: string }[] = [
    { key: "subscriptions", label: "My Subscriptions" },
    { key: "info",          label: "My Info" },
  ];
    return (
        <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#0d1117",
          color: "#f1f5f9",
          fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        {/* ── Top sticky profile tab bar ── */}
        <div
          style={{
            // position: "sticky",
            top: 0,
            zIndex: 50,
            backgroundColor: "rgba(13,17,23,0.92)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid #1e293b",
          }}
        >
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 20px" }}>
            {/* Page title row */}
            <div style={{ padding: "16px 0 0", display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <p style={{ margin: 0, color: "#f8fafc", fontSize: 15, fontWeight: 700, lineHeight: 1.2 }}>John Tipster</p>
                <p style={{ margin: 0, color: "#475569", fontSize: 12 }}>My Profile</p>
              </div>
            </div>
   
            {/* Tab switcher */}
            <div style={{ display: "flex", gap: 0, marginTop: 12 }}>
              {profileTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setProfileTab(tab.key)}
                  style={{
                    padding: "10px 20px",
                    border: "none",
                    borderBottom: profileTab === tab.key ? "2px solid #6366f1" : "2px solid transparent",
                    backgroundColor: "transparent",
                    color: profileTab === tab.key ? "#6366f1" : "#475569",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "color 0.15s, border-color 0.15s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
   
        {/* ── Content ── */}
        <main style={{ maxWidth: 1120, margin: "0 auto", padding: "32px 20px 80px" }}>
          {profileTab === "subscriptions" ? <MySubscriptions /> : <MyInfo />}
        </main>
      </div>
    )
}

export default MyProfileDisplay
