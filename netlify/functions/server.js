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
    let build;
    try {
      build = require("../../build/server/index.js");
      console.log("Build loaded successfully, build object:", typeof build);
    } catch (buildError) {
      console.error("Failed to load build:", buildError);

      // Return a simple HTML page if build is missing
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "text/html",
        },
        body: `
          <!DOCTYPE html>
          <html>
            <head>
              <title>Relationship Mojo</title>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            <body style="font-family: Arial, sans-serif; margin: 40px; background: linear-gradient(135deg, #090040, #471396, #B13BFF); color: white; min-height: 100vh;">
              <div style="max-width: 600px; margin: 0 auto; text-align: center; padding: 40px;">
                <h1>🚀 Relationship Mojo</h1>
                <p>The site is deploying... Please refresh in a moment!</p>
                <p><small>Build files are still being generated.</small></p>
                <button onclick="location.reload()" style="background: #FFCC00; color: #090040; border: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 20px;">
                  Refresh Page
                </button>
              </div>
            </body>
          </html>
        `,
      };
    }

    // Create the handler
    const handler = createRequestHandler({
      build,
      mode: process.env.NODE_ENV || "production",
    });
    console.log("Request handler created successfully");

    // Call the handler and ensure proper response format
    const result = await handler(event, context);
    console.log("Handler executed successfully, result:", {
      statusCode: result?.statusCode,
      hasHeaders: !!result?.headers,
      hasBody: !!result?.body
    });

    // Ensure we return a proper response
    if (!result || typeof result !== 'object') {
      throw new Error('Handler returned invalid response');
    }

    return {
      statusCode: result.statusCode || 200,
      headers: result.headers || {
        "Content-Type": "text/html",
      },
      body: result.body || "",
    };

  } catch (error) {
    console.error("Handler error:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "text/html",
      },
      body: `
        <!DOCTYPE html>
        <html>
          <head><title>Server Error</title></head>
          <body>
            <h1>Server Error</h1>
            <p>Error: ${error.message}</p>
            <pre>${error.stack}</pre>
          </body>
        </html>
      `,
    };
  }
};
