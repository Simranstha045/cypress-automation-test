const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.baseUrl = "https://www.saucedemo.com";
      return config;
    },
    // Run all tests even if one fails
    runMode: {
      stopSpecOnFailure: false
    }
  },
});
