import { RootState } from "@/lib/store";
import { formatMonthYear } from "@/utils/utils";
import { Mail, Phone } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";


function IconX({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }

  function IconInstagram({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
   
  function IconEdit({ size = 14, color = "currentColor" }: { size?: number; color?: string }) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    );
  }
   
  function IconLogout({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    );
  }
   
  function IconCheck({ size = 14, color = "currentColor" }: { size?: number; color?: string }) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
  }
   
  function IconShield({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  }

function MyInfo() {
   
  const [editingX, setEditingX]     = useState(false);
  const [editingIg, setEditingIg]   = useState(false);
  const [savedX, setSavedX]         = useState(false);
  const [savedIg, setSavedIg]       = useState(false);
 
  const [showLogout, setShowLogout] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const [xHandle, setXHandle]       = useState(user?.handle.x ?? "not provides");
  const [igHandle, setIgHandle]     = useState(user?.handle.instagram ?? "not provided");

  const [tempX, setTempX]           = useState(xHandle);
  const [tempIg, setTempIg]         = useState(igHandle);
 
  const handleSaveX = () => {
    setXHandle(tempX);
    setEditingX(false);
    setSavedX(true);
    setTimeout(() => setSavedX(false), 2000);
  };
 
  const handleSaveIg = () => {
    setIgHandle(tempIg);
    setEditingIg(false);
    setSavedIg(true);
    setTimeout(() => setSavedIg(false), 2000);
  };
    return (
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
      {/* ── Profile hero card ── */}
      <div
        style={{
          position: "relative",
          borderRadius: 20,
          overflow: "hidden",
          marginBottom: 20,
          border: "1px solid rgba(51,65,85,0.8)",
        }}
      >
        {/* Gradient banner */}
        <div
          style={{
            height: 100,
            background: "linear-gradient(135deg, #0f2040 0%, #1a1035 40%, #0d1f30 70%, #112033 100%)",
            position: "relative",
          }}
        >
          {/* Subtle mesh dots */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.18) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          {/* Glow */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: 260,
              height: 80,
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(99,102,241,0.22) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />
        </div>
 
        {/* Avatar */}
        <div style={{ padding: "0 24px 24px", backgroundColor: "#161f2e" }}>
          <div style={{ position: "relative", display: "inline-block", marginTop: -36 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                border: "3px solid #0d1117",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: "-1px",
              }}
            >
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            {/* Online indicator */}
            <span
              style={{
                position: "absolute",
                bottom: 3,
                right: 3,
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: "#4ade80",
                border: "2.5px solid #161f2e",
              }}
            />
          </div>
 
          <div style={{ marginTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <h2 style={{ margin: 0, color: "#f8fafc", fontSize: 20, fontWeight: 800 }}>
                {user?.name ?? "Tipster"}
              </h2>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#fbbf24",
                  backgroundColor: "rgba(251,191,36,0.12)",
                  padding: "3px 10px",
                  borderRadius: 999,
                  border: "1px solid rgba(251,191,36,0.25)",
                }}
              >
                VIP Member
              </span>
            </div>
            <p style={{ margin: "5px 0 0", color: "#475569", fontSize: 13 }}>
              Member since {formatMonthYear(user?.createdAt ?? "")}
            </p>
          </div>
 
          {/* Quick stats strip */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 1,
              marginTop: 20,
              backgroundColor: "#1e293b",
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid #1e293b",
            }}
          >
            {[
              { val: "6",   label: "Subscriptions" },
              { val: "74%", label: "Avg win rate"  },
              { val: "87",  label: "Days active"   },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "14px 0",
                  textAlign: "center",
                  backgroundColor: "#161f2e",
                  borderRight: i < 2 ? "1px solid #1e293b" : "none",
                }}
              >
                <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#f1f5f9" }}>{s.val}</p>
                <p style={{ margin: "3px 0 0", fontSize: 11, color: "#475569" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
 
      {/* ── Contact info (read-only) ── */}
      <div
        style={{
          backgroundColor: "#161f2e",
          border: "1px solid rgba(51,65,85,0.8)",
          borderRadius: 16,
          padding: 20,
          marginBottom: 16,
        }}
      >
        <p style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 700, color: "#334155", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Account details
        </p>
 
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { icon: <Mail size={15} color="#6366f1" />, label: "Email",  value: "john.tipster@email.com" },
            { icon: <Phone size={15} color="#6366f1" />, label: "Phone",  value: "+255 712 345 678" },
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                backgroundColor: "#0d1117",
                borderRadius: 10,
                border: "1px solid #1e293b",
              }}
            >
              <span style={{ flexShrink: 0 }}>{row.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 11, color: "#475569", marginBottom: 2 }}>{row.label}</p>
                <p style={{ margin: 0, fontSize: 14, color: "#cbd5e1", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.value}</p>
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: "#334155",
                  backgroundColor: "#1e293b",
                  padding: "2px 8px",
                  borderRadius: 999,
                  flexShrink: 0,
                }}
              >
                locked
              </span>
            </div>
          ))}
        </div>
      </div>
 
      {/* ── Social handles ── */}
      <div
        style={{
          backgroundColor: "#161f2e",
          border: "1px solid rgba(51,65,85,0.8)",
          borderRadius: 16,
          padding: 20,
          marginBottom: 16,
        }}
      >
        <p style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 700, color: "#334155", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Social handles
        </p>
 
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* ── X (Twitter) ── */}
          <div
            style={{
              padding: "14px",
              backgroundColor: "#0d1117",
              borderRadius: 12,
              border: editingX ? "1px solid rgba(99,102,241,0.5)" : "1px solid #1e293b",
              transition: "border-color 0.2s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: editingX ? 12 : 0 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  backgroundColor: "rgba(0,0,0,0.6)",
                  border: "1px solid #1e293b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <IconX size={15} color="#f1f5f9" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 11, color: "#475569", marginBottom: 2 }}>X (Twitter)</p>
                {!editingX && (
                  <p style={{ margin: 0, fontSize: 14, color: xHandle ? "#cbd5e1" : "#334155", fontWeight: 500 }}>
                    {xHandle || "Not set"}
                  </p>
                )}
              </div>
              {!editingX && (
                <button
                  onClick={() => { setTempX(xHandle); setEditingX(true); }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "6px 12px",
                    borderRadius: 8,
                    border: "1px solid #1e293b",
                    backgroundColor: "transparent",
                    color: "#64748b",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <IconEdit size={12} color="#64748b" />
                  Edit
                </button>
              )}
              {savedX && (
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#4ade80", flexShrink: 0 }}>
                  <IconCheck size={13} color="#4ade80" /> Saved
                </span>
              )}
            </div>
            {editingX && (
              <div>
                <input
                  value={tempX}
                  onChange={(e) => setTempX(e.target.value)}
                  placeholder="@yourhandle"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: "1px solid rgba(99,102,241,0.4)",
                    backgroundColor: "#161f2e",
                    color: "#f1f5f9",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                    marginBottom: 10,
                  }}
                />
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={handleSaveX}
                    style={{
                      flex: 1,
                      padding: "9px 0",
                      borderRadius: 8,
                      border: "none",
                      backgroundColor: "#6366f1",
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingX(false)}
                    style={{
                      flex: 1,
                      padding: "9px 0",
                      borderRadius: 8,
                      border: "1px solid #1e293b",
                      backgroundColor: "transparent",
                      color: "#64748b",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
 
          {/* ── Instagram ── */}
          <div
            style={{
              padding: "14px",
              backgroundColor: "#0d1117",
              borderRadius: 12,
              border: editingIg ? "1px solid rgba(236,72,153,0.4)" : "1px solid #1e293b",
              transition: "border-color 0.2s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: editingIg ? 12 : 0 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  background: "linear-gradient(135deg, #f97316, #ec4899, #8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <IconInstagram size={15} color="#fff" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 11, color: "#475569", marginBottom: 2 }}>Instagram</p>
                {!editingIg && (
                  <p style={{ margin: 0, fontSize: 14, color: igHandle ? "#cbd5e1" : "#334155", fontWeight: 500 }}>
                    {igHandle || "Not set"}
                  </p>
                )}
              </div>
              {!editingIg && (
                <button
                  onClick={() => { setTempIg(igHandle); setEditingIg(true); }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "6px 12px",
                    borderRadius: 8,
                    border: "1px solid #1e293b",
                    backgroundColor: "transparent",
                    color: "#64748b",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <IconEdit size={12} color="#64748b" />
                  Edit
                </button>
              )}
              {savedIg && (
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#4ade80", flexShrink: 0 }}>
                  <IconCheck size={13} color="#4ade80" /> Saved
                </span>
              )}
            </div>
            {editingIg && (
              <div>
                <input
                  value={tempIg}
                  onChange={(e) => setTempIg(e.target.value)}
                  placeholder="@yourhandle"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: "1px solid rgba(236,72,153,0.35)",
                    backgroundColor: "#161f2e",
                    color: "#f1f5f9",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                    marginBottom: 10,
                  }}
                />
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={handleSaveIg}
                    style={{
                      flex: 1,
                      padding: "9px 0",
                      borderRadius: 8,
                      border: "none",
                      background: "linear-gradient(135deg, #f97316, #ec4899)",
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingIg(false)}
                    style={{
                      flex: 1,
                      padding: "9px 0",
                      borderRadius: 8,
                      border: "1px solid #1e293b",
                      backgroundColor: "transparent",
                      color: "#64748b",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
 
      {/* ── Security ── */}
      <div
        style={{
          backgroundColor: "#161f2e",
          border: "1px solid rgba(51,65,85,0.8)",
          borderRadius: 16,
          padding: 20,
          marginBottom: 16,
        }}
      >
        <p style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 700, color: "#334155", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Security
        </p>
        <button
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "13px 14px",
            backgroundColor: "#0d1117",
            border: "1px solid #1e293b",
            borderRadius: 10,
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              backgroundColor: "rgba(99,102,241,0.12)",
              border: "1px solid rgba(99,102,241,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <IconShield size={15} color="#6366f1" />
          </div>
          <div>
            <p style={{ margin: 0, color: "#cbd5e1", fontSize: 14, fontWeight: 600 }}>Change password</p>
            <p style={{ margin: "2px 0 0", color: "#475569", fontSize: 12 }}>Last changed 45 days ago</p>
          </div>
          <svg style={{ marginLeft: "auto", flexShrink: 0 }} width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
 
      {/* ── Logout ── */}
      <div
        style={{
          backgroundColor: "#161f2e",
          border: "1px solid rgba(51,65,85,0.8)",
          borderRadius: 16,
          padding: 20,
          marginBottom: 8,
        }}
      >
        {!showLogout ? (
          <button
            onClick={() => setShowLogout(true)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 9,
              padding: "13px 0",
              borderRadius: 10,
              border: "1px solid rgba(248,113,113,0.3)",
              backgroundColor: "rgba(248,113,113,0.06)",
              color: "#f87171",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <IconLogout size={16} color="#f87171" />
            Log out
          </button>
        ) : (
          <div>
            <p style={{ margin: "0 0 14px", color: "#94a3b8", fontSize: 14, textAlign: "center" }}>
              Are you sure you want to log out?
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => alert("Logged out!")}
                style={{
                  flex: 1,
                  padding: "11px 0",
                  borderRadius: 10,
                  border: "none",
                  backgroundColor: "#ef4444",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Yes, log out
              </button>
              <button
                onClick={() => setShowLogout(false)}
                style={{
                  flex: 1,
                  padding: "11px 0",
                  borderRadius: 10,
                  border: "1px solid #1e293b",
                  backgroundColor: "transparent",
                  color: "#64748b",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
 
      <p style={{ textAlign: "center", fontSize: 11, color: "#1e293b", marginTop: 16 }}>
        App version 1.4.2 · Terms · Privacy
      </p>
    </div>
    )
}

export default MyInfo
