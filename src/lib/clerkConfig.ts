export const CLERK_PUBLISHABLE_KEY =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export const CLERK_SYNC_HOST = import.meta.env.VITE_CLERK_SYNC_HOST;

export const POPUP_PATH = "src/popup/index.html";

export function getPopupUrl() {
  return chrome.runtime.getURL(POPUP_PATH);
}
