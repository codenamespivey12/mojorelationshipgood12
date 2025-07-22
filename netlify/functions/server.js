const { createRequestHandler } = require("@netlify/remix-adapter");

let _handler;

const handler = async (event, context) => {
  if (!_handler) {
    try {
      const build = require("../../build/server/index.js");
      _handler = createRequestHandler({
        build,
        mode: process.env.NODE_ENV || "production",
      });
    } catch (error) {
      console.error("Error creating handler:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to initialize server" }),
      };
    }
  }

  return _handler(event, context);
};

exports.handler = handler;
