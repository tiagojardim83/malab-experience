import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const githubPagesBase = "/malab-experience/";

const assetJsonBasePlugin = (base: string): Plugin => ({
  name: "asset-json-base",
  enforce: "pre",
  transform(code, id) {
    if (base === "/" || !id.endsWith(".asset.json")) return null;

    return {
      code: code.replace(/"url"\s*:\s*"\/assets\//g, `"url": "${base}assets/`),
      map: null,
    };
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const base = process.env.GITHUB_PAGES === "true" ? githubPagesBase : "/";

  return {
    base,
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      assetJsonBasePlugin(base),
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
