import { defineManifest } from "@crxjs/vite-plugin";

export function createManifest(clerkFapi?: string) {
  const hostPermissions = [
    "https://chatgpt.com/*",
    "https://claude.ai/*",
    "https://gemini.google.com/*",
  ];

  if (clerkFapi) {
    hostPermissions.push(`${clerkFapi}/*`);
  }

  return defineManifest({
    manifest_version: 3,

    name: "Memra",
    version: "0.0.1",

    permissions: ["storage", "cookies"],

    host_permissions: hostPermissions,

    action: {
      default_title: "Memra",
      default_popup: "src/popup/index.html",
    },

    background: {
      service_worker: "src/background/index.ts",
      type: "module",
    },

    content_scripts: [
      {
        matches: [
          "https://chatgpt.com/*",
          "https://claude.ai/*",
          "https://gemini.google.com/*",
        ],
        js: ["src/content/index.tsx"],
      },
    ],
  });
}
