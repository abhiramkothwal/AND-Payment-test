const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:4242',
    headless: false,
    video: 'on',
    screenshot: 'on',
    trace: 'retain-on-failure',
    launchOptions: { slowMo: 300 },
  },
});