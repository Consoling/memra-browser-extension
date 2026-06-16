import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,

  name: "Memra",
  version: "0.0.1",

  permissions: ["storage"],

  host_permissions: [
    "https://chatgpt.com/*",
    "https://claude.ai/*",
    "https://gemini.google.com/*"
  ],

  background: {
    service_worker: "src/background/index.ts"
  },

  content_scripts: [
    {
      matches: [
        "https://chatgpt.com/*",
        "https://claude.ai/*",
        "https://gemini.google.com/*"
      ],
      js: ["src/content/index.tsx"]
    }
  ]
});