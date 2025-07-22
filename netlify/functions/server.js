exports.handler = async (event, context) => {
  console.log("Handler called with:", {
    method: event.httpMethod,
    path: event.path,
    env: process.env.NODE_ENV
  });

  try {
    // Try to require the adapter
    const { createRequestHandler } = require("@netlify/remix-adapter");
    console.log("Remix adapter loaded successfully");

    // Try to require the build
    const build = require("../../build/server/index.js");
    console.log("Build loaded successfully");

    // Create the handler
    const handler = createRequestHandler({
      build,
      mode: process.env.NODE_ENV || "production",
    });
    console.log("Request handler created successfully");

    // Call the handler
    const result = await handler(event, context);
    console.log("Handler executed successfully");
    return result;

  } catch (error) {
    console.error("Handler error:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: "Server error",
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      }),
    };
  }
};
