const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: false,
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.cy.{ts,tsx,js}",
  },
  component: {
    specPattern: "cypress/component/**/*.cy.{ts,tsx,js}",
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: "vite.config.ts",
    },
  },
});
