// vitest.config.js
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup-alternative.js", // Try the alternative setup file
    deps: {
      inline: ["@testing-library/jest-dom"],
    },
    coverage: {
      provider: "v8", // or 'istanbul'
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/**",
        "dist/**",
        "**/*.d.ts",
        "test/**",
        "vite.config.js",
        "vitest.config.js",
        "coverage/**",
      ],
    },
    watch: false,
    include: ["src/**/*.{test,spec}.{js,jsx}"],
  },
});
