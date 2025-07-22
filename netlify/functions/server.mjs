import { createRequestHandler } from "@netlify/remix-adapter";

export const handler = createRequestHandler({
  build: () => import("../../build/server/index.js"),
  mode: process.env.NODE_ENV,
});
