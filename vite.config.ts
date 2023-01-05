import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";
import { dependencies } from "./package.json";
import react from "@vitejs/plugin-react";
import dns from "dns";

//open in localhost instead of 127.0.0.1
dns.setDefaultResultOrder("verbatim");

//optimize chunks
function renderChunks(deps: Record<string, string>) {
  const chunks = {};
  Object.keys(deps).forEach((key) => {
    if (["react", "react-router-dom", "react-dom"].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-router-dom", "react-dom"],
          ...renderChunks(dependencies),
        },
      },
    },
  },
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({ registerType: "autoUpdate", injectRegister: "auto" }),
  ],

  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 3000,
    open: true,
  },
});
