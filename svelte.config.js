import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "index.html",
      precompress: false, // Enable Brotli and Gzip precompression
      strict: true,
    }),

    // Add CSP headers
    csp: {
      mode: "auto",
      directives: {
        "script-src": ["self"],
      },
    },

    // Optimize for production
    version: {
      name: Date.now().toString(),
    },
  },
};

export default config;
