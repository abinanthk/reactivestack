import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@reactivestack/vannila": path.resolve(__dirname, "../../packages/vannila"),
      "@reactivestack/react": path.resolve(__dirname, "../../packages/react"),
      "@reactivestack/plugins": path.resolve(__dirname, "../../packages/plugins"),
    },
  },
});
