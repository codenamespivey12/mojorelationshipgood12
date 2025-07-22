// Simple, direct approach using the standard Remix adapter pattern
const { createRequestHandler } = require("@netlify/remix-adapter");

let handler;

exports.handler = async (event, context) => {
  // Initialize handler only once
  if (!handler) {
    try {
      const build = require("../../build/server/index.js");

      // Validate build object
      console.log("Build object keys:", Object.keys(build || {}));
      console.log("Routes:", typeof build?.routes, build?.routes ? Object.keys(build.routes).length : 'undefined');
      console.log("Assets manifest:", typeof build?.assets);
      console.log("Entry module:", typeof build?.entry?.module);

      if (!build || !build.routes || typeof build.routes !== 'object' || Object.keys(build.routes).length === 0) {
        console.error('Build validation failed:', {
          hasBuild: !!build,
          hasRoutes: !!build?.routes,
          routesType: typeof build?.routes,
          routesCount: build?.routes ? Object.keys(build.routes).length : 0
        });
        throw new Error('Invalid build object: missing or invalid routes');
      }

      handler = createRequestHandler({
        build,
        mode: process.env.NODE_ENV || "production",
      });
      console.log("Remix handler initialized successfully");
    } catch (error) {
      console.error("Failed to initialize handler:", error);

      // Return a fallback page if build is missing
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
        body: `<!DOCTYPE html>
<html>
<head>
  <title>Relationship Mojo</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      background: linear-gradient(135deg, #090040, #471396, #B13BFF);
      color: white;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      max-width: 600px;
      text-align: center;
      padding: 40px;
    }
    button {
      background: #FFCC00;
      color: #090040;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚀 Relationship Mojo</h1>
    <p>The site is still deploying... Please refresh in a moment!</p>
    <p><small>Build files are being generated.</small></p>
    <button onclick="location.reload()">Refresh Page</button>
  </div>
</body>
</html>`,
      };
    }
  }

  // Use the handler
  try {
    return await handler(event, context);
  } catch (error) {
    console.error("Handler execution error:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
      body: `<!DOCTYPE html>
<html>
<head><title>Server Error</title></head>
<body style="font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5;">
  <h1>Server Error</h1>
  <p>Something went wrong: ${error.message}</p>
  <button onclick="location.reload()" style="background: #007cba; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">
    Try Again
  </button>
</body>
</html>`,
    };
  }
};
