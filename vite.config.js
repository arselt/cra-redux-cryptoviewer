import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// outDir "build" keeps the existing Netlify publish directory working
export default defineConfig({
  plugins: [react()],
  build: { outDir: "build" }
});
