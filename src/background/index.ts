import { createClerkClient } from "@clerk/chrome-extension/client";
import {
  CLERK_PUBLISHABLE_KEY,
  CLERK_SYNC_HOST,
  getPopupUrl,
} from "../lib/clerkConfig";

if (!CLERK_PUBLISHABLE_KEY) {
  console.error("Memra: missing VITE_CLERK_PUBLISHABLE_KEY");
}

async function getClerk() {
  return createClerkClient({
    publishableKey: CLERK_PUBLISHABLE_KEY,
    syncHost: CLERK_SYNC_HOST,
    background: true,
  });
}

async function getToken(): Promise<string | null> {
  const clerk = await getClerk();
  if (!clerk.session) return null;
  return clerk.session.getToken();
}

async function getAuth() {
  const clerk = await getClerk();
  return {
    isSignedIn: !!clerk.user,
    userId: clerk.user?.id ?? null,
    email: clerk.user?.primaryEmailAddress?.emailAddress ?? null,
  };
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === "GET_TOKEN") {
    getToken()
      .then((token) => sendResponse({ token }))
      .catch(() => sendResponse({ token: null }));
    return true;
  }

  if (msg.type === "GET_AUTH") {
    getAuth()
      .then(sendResponse)
      .catch(() =>
        sendResponse({ isSignedIn: false, userId: null, email: null })
      );
    return true;
  }

  if (msg.type === "SIGN_OUT") {
    getClerk()
      .then((clerk) =>
        clerk.signOut({ redirectUrl: getPopupUrl() })
      )
      .then(() => {
        chrome.storage.local.set({ memraAuthChangedAt: Date.now() });
        sendResponse({ ok: true });
      })
      .catch(() => sendResponse({ ok: false }));
    return true;
  }
});

console.log("Memra background loaded");
