import { reactRouter } from "@react-router/dev/vite";
import { sentryReactRouter, type SentryReactRouterBuildOptions } from "@sentry/react-router";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const sentryConfig: SentryReactRouterBuildOptions = {
  org: "js-mastery-fc",
  project: "javascript-react",
  // An auth token is required for uploading source maps.
  authToken:
    "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",
  // ...
};

// export default defineConfig({
//   plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), sentryReactRouter(sentryConfig, config)],
//   ssr: {
//     noExternal: [/@syncfusion/]
//   }
// });

export default defineConfig((config) => {
  return {
    plugins: [
      tailwindcss(),
      reactRouter(),
      tsconfigPaths(),
      sentryReactRouter(sentryConfig, config),
    ],
    ssr: {
      noExternal: [/@syncfusion/],
    },
  };
});
