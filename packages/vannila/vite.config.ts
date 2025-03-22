import { defineConfig } from 'vite'
import {resolve} from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), dts({ rollupTypes: true })],
  build: {
    // library entry and output settings
    lib: {
      entry: resolve(__dirname, "index.ts"),
      name: "index",
      fileName: "index",
    },
  }
})