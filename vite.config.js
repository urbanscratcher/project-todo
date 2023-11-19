import UnoCSS from "unocss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3100,
  },
  plugins: [UnoCSS(), react()],
});
