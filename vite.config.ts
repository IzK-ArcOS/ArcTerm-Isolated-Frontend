import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      $stores: resolve(__dirname, "./src/stores"),
      $ts: resolve(__dirname, "./src/ts"),
      $types: resolve(__dirname, "./src/types"),
      $assets: resolve(__dirname, "./src/assets"),
      $state: resolve(__dirname, "./src/state"),
      $lib: resolve(__dirname, "./src/lib"),
      $css: resolve(__dirname, "./src/css"),
    },
  },
});
