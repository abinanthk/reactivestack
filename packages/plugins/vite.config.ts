import { defineConfig } from 'vite'
import {resolve} from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'
import dts from "vite-plugin-dts";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), dts({ rollupTypes: true })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@reactivestack/vannila": path.resolve(__dirname, "../../packages/vannila"),
      "@reactivestack/devtools-client": path.resolve(__dirname, "../../packages/devtools-client"),
    },
  },
  build: {
    // library entry and output settings
    lib: {
      entry: resolve(__dirname, "index.ts"),
      name: "index",
      fileName: "index",
    },
  },
})