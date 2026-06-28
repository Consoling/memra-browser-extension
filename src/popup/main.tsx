import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  ClerkProvider,
  Show,
  SignIn,
  UserButton,
  useAuth,
} from "@clerk/chrome-extension";
import {
  CLERK_PUBLISHABLE_KEY,
  CLERK_SYNC_HOST,
  getPopupUrl,
} from "../lib/clerkConfig";

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY");
}

const popupUrl = getPopupUrl();

function AuthNotifier() {
  const { isSignedIn } = useAuth();

  useEffect(() => {
    chrome.storage.local.set({ memraAuthChangedAt: Date.now() });
  }, [isSignedIn]);

  return null;
}

function App() {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      syncHost={CLERK_SYNC_HOST}
      afterSignOutUrl={popupUrl}
      signInFallbackRedirectUrl={popupUrl}
      signUpFallbackRedirectUrl={popupUrl}
    >
      <AuthNotifier />
      <div
        style={{
          width: 380,
          minHeight: 480,
          padding: 20,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          background: "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)",
        }}
      >
        <h1
          style={{
            margin: "0 0 4px",
            fontSize: 20,
            fontWeight: 700,
            color: "#111827",
          }}
        >
          Memra
        </h1>
        <p style={{ margin: "0 0 20px", fontSize: 12, color: "#6B7280" }}>
          Sign in to sync your memories
        </p>

        <Show when="signed-out">
          <SignIn routing="hash" />
        </Show>

        <Show when="signed-in">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "rgba(255,255,255,0.7)",
              borderRadius: 12,
              padding: "12px 14px",
              border: "1px solid rgba(255,255,255,0.9)",
            }}
          >
            <span style={{ fontSize: 13, color: "#374151" }}>
              You&apos;re signed in
            </span>
            <UserButton />
          </div>
        </Show>
      </div>
    </ClerkProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
