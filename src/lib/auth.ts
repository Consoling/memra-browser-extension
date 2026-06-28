import { getPopupUrl } from "./clerkConfig";

export type AuthState = {
  isSignedIn: boolean;
  userId: string | null;
  email: string | null;
};

export function getAuthState(): Promise<AuthState> {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: "GET_AUTH" }, (response) => {
      resolve({
        isSignedIn: response?.isSignedIn ?? false,
        userId: response?.userId ?? null,
        email: response?.email ?? null,
      });
    });
  });
}

export function getAuthToken(): Promise<string | null> {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: "GET_TOKEN" }, (response) => {
      resolve(response?.token ?? null);
    });
  });
}

export function signOut(): Promise<void> {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: "SIGN_OUT" }, () => resolve());
  });
}

export function openSignIn() {
  window.open(getPopupUrl(), "_blank", "width=420,height=640");
}
