import { createRequestHandler } from "@netlify/remix-adapter";

const handler = createRequestHandler({
  build: () => import("../../build/server/index.js"),
  mode: process.env.NODE_ENV,
});

export { handler };
