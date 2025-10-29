import js from "@eslint/js";
import globals from "globals";

export default [
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",  // Cambiado a "module"
      globals: {
        ...globals.browser,
        ...globals.node,
      }
    },
    rules: {
      ...js.configs.recommended.rules,
    }
  },
  {
    // Configuración específica para archivos de k6
    files: ["k6/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        __ENV: "readonly",
        __VU: "readonly",
        __ITER: "readonly",
      }
    },
    rules: {
      "no-undef": "off", // Desactiva la regla no-undef para k6
    }
  },
  {
    // Archivos de Node.js que usan CommonJS
    files: ["src/**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      }
    }
  }
];