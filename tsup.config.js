import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.js"],
  outDir: "dist",
  minify: false,
  clean: true,
  format: ["esm", "cjs"],
  treeshake: true
});
