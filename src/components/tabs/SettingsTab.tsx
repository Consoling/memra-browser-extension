import { useCallback, useEffect, useState } from "react";
import {
  getAuthState,
  openSignIn,
  signOut,
  type AuthState,
} from "../../lib/auth";

export default function SettingsTab() {
  const [auth, setAuth] = useState<AuthState | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    setAuth(await getAuthState());
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();

    const onStorage = (
      changes: Record<string, chrome.storage.StorageChange>
    ) => {
      if (changes.memraAuthChangedAt) refresh();
    };

    chrome.storage.onChanged.addListener(onStorage);
    return () => chrome.storage.onChanged.removeListener(onStorage);
  }, [refresh]);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    await refresh();
    setSigningOut(false);
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ marginBottom: 16 }}>
        <h3
          style={{
            margin: 0,
            fontSize: 14,
            fontWeight: 700,
            color: "#111827",
            letterSpacing: "-0.02em",
          }}
        >
          Account
        </h3>
        <p style={{ margin: "2px 0 0", fontSize: 11, color: "#9CA3AF" }}>
          Manage your Memra sign-in
        </p>
      </div>

      <div
        style={{
          background: "rgba(255,255,255,0.55)",
          border: "1px solid rgba(255,255,255,0.7)",
          borderRadius: 12,
          padding: "14px 14px",
          backdropFilter: "blur(8px)",
        }}
      >
        {loading ? (
          <p style={{ margin: 0, fontSize: 12.5, color: "#9CA3AF" }}>
            Checking session…
          </p>
        ) : auth?.isSignedIn ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  color: "#9CA3AF",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                Signed in as
              </p>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#111827",
                  wordBreak: "break-all",
                }}
              >
                {auth.email ?? auth.userId}
              </p>
            </div>

            <button
              onClick={handleSignOut}
              disabled={signingOut}
              style={{
                alignSelf: "flex-start",
                padding: "7px 12px",
                borderRadius: 8,
                border: "1px solid rgba(203,41,87,0.25)",
                background: "rgba(203,41,87,0.08)",
                color: "#CB2957",
                fontSize: 12,
                fontWeight: 600,
                cursor: signingOut ? "default" : "pointer",
                opacity: signingOut ? 0.6 : 1,
              }}
            >
              {signingOut ? "Signing out…" : "Sign out"}
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ margin: 0, fontSize: 12.5, color: "#6B7280" }}>
              Sign in to sync memories across devices.
            </p>
            <button
              onClick={openSignIn}
              style={{
                alignSelf: "flex-start",
                padding: "8px 14px",
                borderRadius: 8,
                border: "none",
                background: "#111827",
                color: "white",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Sign in
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
