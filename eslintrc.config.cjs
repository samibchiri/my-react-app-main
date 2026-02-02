// eslint.config.js
export default {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: ["eslint:recommended", "plugin:import/errors", "plugin:import/warnings"],
  plugins: ["import"],
  rules: {
    "import/no-unresolved": "error" // ✅ detects wrong imports
  }
};
