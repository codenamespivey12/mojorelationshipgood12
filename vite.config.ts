import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { config } from "dotenv";

// Load environment variables
config();

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  define: {
    // Make environment variables available to the client if needed
    'process.env.CLERK_PUBLISHABLE_KEY': JSON.stringify(process.env.CLERK_PUBLISHABLE_KEY),
  },
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
      serverBuildFile: "index.js",
      serverModuleFormat: "esm",
    }),
    tsconfigPaths(),
  ],
});
