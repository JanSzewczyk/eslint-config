import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  outDir: "dist",
  minify: false,
  clean: true,
  format: ["esm", "cjs"],
  dts: true,
  treeshake: true
});
