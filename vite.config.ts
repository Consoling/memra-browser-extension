import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [crx({ manifest }),   tailwindcss(),]
});