/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

const defaultResolveRequest = config.resolver.resolveRequest;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "zustand/middleware") {
    return {
      type: "sourceFile",
      filePath: path.join(__dirname, "node_modules/zustand/middleware.js"),
    };
  }

  if (defaultResolveRequest) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return defaultResolveRequest(context, moduleName, platform);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: "./global.css" });
