import { defineConfig } from "vitest/config"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    globals: true,
    css: true,
  },
  resolve: {
    alias: {
      "~/": new URL("./app/", import.meta.url).pathname,
      "@/": new URL("./", import.meta.url).pathname,
    },
  },
})
