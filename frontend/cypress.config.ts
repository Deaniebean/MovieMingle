import { defineConfig } from "cypress";

export default defineConfig({
  // Configuration for end-to-end tests
  e2e: {
    specPattern: "cypress/e2e", 
    setupNodeEvents(on, config) {
    },
  },

  // Configuration for component tests
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
