import { defineConfig, loadEnv } from "vite";
import { crx } from "@crxjs/vite-plugin";
import { createManifest } from "./manifest";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      crx({ manifest: createManifest(env.VITE_CLERK_FRONTEND_API) }),
      tailwindcss(),
    ],
  };
});
