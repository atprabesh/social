import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const dir = __dirname;
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@pages": path.resolve(dir, "src/pages"),
      "@components": path.resolve(dir, "src/Components"),
      "@routes": path.resolve(dir, "src/Routes"),
      "@utils": path.resolve(dir, "src/utils"),
      "@context": path.resolve(dir, "src/context"),
      "@hooks": path.resolve(dir, "src/hooks"),
      "@services": path.resolve(dir, "src/services"),
      "@types": path.resolve(dir, "src/types"),
    },
  },
});
