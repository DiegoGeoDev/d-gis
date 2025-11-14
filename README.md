# D-GIS - Modern React Map Components Library

D-GIS is a comprehensive React map components library built with shadcn/ui architecture patterns. It provides high-quality, reusable map components following modern React patterns with TypeScript.

## 🗺️ Features

- **Accessibility First**: WCAG 2.1 AA compliant components with screen reader support
- **Clean & Simple**: Intuitive UX with mobile-first responsive design
- **Performance Optimized**: 60fps interactions, <50kb gzipped core bundle
- **shadcn/ui Architecture**: Copy-paste installation with full customization
- **Zero Dependencies**: Minimal external dependencies for maximum compatibility
- **TypeScript Native**: Comprehensive type definitions and strict type safety

## 🚀 Technology Stack

- **React 19+** with TypeScript and Vite for modern development
- **MapLibre GL JS** via react-map-gl for open-source map rendering
- **deck.gl** for high-performance WebGL data visualization
- **Tailwind CSS** for utility-first styling and theming
- **TanStack Router** for type-safe navigation in component registry

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
