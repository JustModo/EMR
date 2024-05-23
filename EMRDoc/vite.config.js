import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      "@": new URL("./src/", import.meta.url).pathname,
      "@styles": new URL("./src/styles/", import.meta.url).pathname,
      "@components": new URL("./src/components/", import.meta.url).pathname,
      "@assets": new URL("./src/assets/", import.meta.url).pathname,
    },
  },
});
