# @szum-tech/eslint-config

![GitHub release (latest by date)](https://img.shields.io/github/v/release/JanSzewczyk/eslint-config)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/JanSzewczyk/eslint-config)](https://github.com/JanSzewczyk/eslint-config/pulls)
[![GitHub issues](https://img.shields.io/github/issues/JanSzewczyk/eslint-config)](https://github.com/JanSzewczyk/eslint-config/issues)
![GitHub Repo stars](https://img.shields.io/github/stars/JanSzewczyk/eslint-config?style=social)

[![🚀 publish](https://github.com/JanSzewczyk/eslint-config/actions/workflows/publish.yml/badge.svg?branch=main)](https://github.com/JanSzewczyk/eslint-config/actions/workflows/publish.yml)
[![CodeQL 📈](https://github.com/JanSzewczyk/eslint-config/actions/workflows/codeql.yml/badge.svg)](https://github.com/JanSzewczyk/eslint-config/actions/workflows/codeql.yml)

[![npm](https://img.shields.io/npm/v/@szum-tech/eslint-config)](https://www.npmjs.com/package/@szum-tech/eslint-config)
![npm](https://img.shields.io/npm/dm/@szum-tech/eslint-config)

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)
[![MIT License](https://img.shields.io/badge/license-MIT-red.svg?style=flat)](https://github.com/JanSzewczyk/eslint-config/blob/main/LICENSE)

---

A shared configuration is an NPM package that exports a configuration as an array. It's super convenient for anyone to
use, because the configuration dynamically adapts to the needs of the project.

**✨ Ready for ESLint v10!** This configuration uses the modern flat config format and is compatible with ESLint v9.x. Full ESLint v10 support will be added once the ecosystem plugins (especially typescript-eslint) release compatible versions.

## 📚 Features

- **[ESLint v9](https://eslint.org/)** - Latest stable version with full plugin ecosystem support (ready for v10 migration)
- **Flat Config Format** - Uses the modern `eslint.config.js` format (legacy `.eslintrc` is not supported)
- **Auto-detection** - Automatically enables plugins based on your project dependencies
- [Opinionated code formatter with support for: JavaScript, TypeScript, JSX, ...](https://eslint.org/)
- [Support linting of ES2015+ (ES6+) import/export syntax, and prevent issues with misspelling of file paths and import names](https://www.npmjs.com/package/eslint-plugin-import)
- [TypeScript support](https://typescript-eslint.io/packages/typescript-eslint/) - **only** if
  [typescript](https://www.npmjs.com/package/typescript) is used in project
- [React](https://www.npmjs.com/package/eslint-plugin-react) &
  [React Hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) specific linting rules - **only** if
  [react](https://www.npmjs.com/package/react) is used in project
- [Tailwindcss](https://www.npmjs.com/package/eslint-plugin-tailwindcss) specific linting rules - **only** if
  [tailwindcss](https://tailwindcss.com/) is used in project
- [Next.js](https://nextjs.org/docs/app/api-reference/config/eslint) specific linting rules - **only** if
  [next](https://www.npmjs.com/package/next) is used in project
- [Tests](https://www.npmjs.com/package/eslint-plugin-testing-library) specific linting rules - **only** if
  [@testing-library/dom](https://www.npmjs.com/package/@testing-library/dom) is used in project
- [Tests with jest-dom](https://www.npmjs.com/package/eslint-plugin-jest-dom) specific linting rules - **only** if
  [@testing-library/jest-dom](https://www.npmjs.com/package/jest) is used in project
- [Vitest](https://www.npmjs.com/package/@vitest/eslint-plugin) specific linting rules - **only** if
  [vitest](https://www.npmjs.com/package/vitest) is used in project
- [Playwright](https://www.npmjs.com/package/eslint-plugin-playwright) specific linting rules - **only** if
  [@playwright/test](https://www.npmjs.com/package/@playwright/test) is used in project
- [Storybook](https://www.npmjs.com/package/eslint-plugin-storybook) specific linting rules - **only** if
  [storybook](https://www.npmjs.com/package/storybook) is used in project

## 📖 Table of Contents

<!-- TOC -->
* [@szum-tech/eslint-config](#szum-techeslint-config)
  * [📚 Features](#-features)
  * [📖 Table of Contents](#-table-of-contents)
  * [🎯 Getting Started](#-getting-started)
    * [⚙️ Installation](#-installation)
    * [Configuration](#configuration)
  * [💻 Scripts](#-scripts)
  * [🚀 Minimal GitHub ESlint check workflow](#-minimal-github-eslint-check-workflow)
  * [🛠️ Developer Info](#-developer-info)
    * [Dependencies](#dependencies)
  * [📒 Changelog](#-changelog)
  * [📜 License](#-license)
<!-- TOC -->

## 🎯 Getting Started

### ⚙️ Installation

[@szum-tech/eslint-config](https://github.com/JanSzewczyk/eslint-config) is available as
[npm package](https://www.npmjs.com/package/@szum-tech/eslint-config).

**Requirements:**
- **ESLint** v9.0.0 or higher
- **Node.js** v20.x+ / v22.x+ / v24.x+

```shell
# NPM
npm install --save-dev eslint@latest @szum-tech/eslint-config

# YARN
yarn add -D eslint@latest @szum-tech/eslint-config

# PNPM
pnpm add --save-dev eslint@latest @szum-tech/eslint-config

# BUN
bun add --dev eslint@latest @szum-tech/eslint-config
```

### Configuration

This package uses the [ESLint Flat Config format](https://eslint.org/docs/latest/use/configure/configuration-files)
introduced in ESLint v9 and required in ESLint v10. The legacy `.eslintrc` format is not supported.

A `@szum-tech/eslint-config` is an npm package that exports a configuration array that automatically adapts to your
project's dependencies.

**Configuration file: `eslint.config.(js|cjs|mjs)`**

#### Simple Usage

Export the entire configuration as-is:

```js
// eslint.config.mjs
export { default } from "@szum-tech/eslint-config";
```

#### Extended Configuration

`@szum-tech/eslint-config` is flexible enough to allow for configuration extensions. Use the spread operator to insert
the configuration into your array:

```js
// eslint.config.mjs
import szumTechEslintConfig from "@szum-tech/eslint-config";

export default [
  ...szumTechEslintConfig,

  // Your custom modifications
  {
    rules: {
      "no-unused-vars": "warn"
    }
  }
];
```

#### CommonJS Format

For projects using CommonJS:

```js
// eslint.config.cjs
const szumTechEslintConfig = require("@szum-tech/eslint-config");

module.exports = [
  ...szumTechEslintConfig,

  // Your custom modifications
  {
    rules: {
      "no-unused-vars": "warn"
    }
  }
];
```

> **Note:** The configuration automatically detects which libraries are installed in your project (React, TypeScript,
> Next.js, Vitest, etc.) and enables the appropriate ESLint plugins and rules.

## 💻 Scripts

Suggested scripts you can add to `package.json` file:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:ci": "eslint . -o eslint-results.sarif -f @microsoft/eslint-formatter-sarif",
    "lint:fix": "eslint . --fix",
    "lint:inspect": "npx @eslint/config-inspector@latest"
  }
}
```

**Scripts description:**

- `lint`: Lints the code using ESLint
- `lint:ci`: Lints the code using ESLint for CI - uses a `@microsoft/eslint-formatter-sarif` output format for report
  generation
- `lint:fix`: Automatically fixes linting errors
- `lint:inspect`: Launches a visual representation of the ESLint configuration file (check http://localhost:7777 in your
  browser). Allows you to navigate through the rules, plugins, and language configurations that are enabled or disabled

## 🚀 Minimal GitHub ESLint check workflow

Here are the minimal steps required to run an ESLint check. Creating or adding any content to a PR will trigger this
event. Not only will this action validate the code and return its results, but it will also add highlighted parts of the
code that have an error to the comments under the PR thanks to the `Upload ESLint results to GitHub` step, which uses
`github/codeql-action/upload-sarif`.

```yaml
name: PR Checks ✅

on:
  pull_request:

jobs:
  lint:
    name: ESLint ⬣
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        node-version: [24.x] # Use Node.js 20+, 22+, or 24+
        os: [ubuntu-latest]
    steps:
      - name: Checkout code 📚
        uses: actions/checkout@v4
      - name: Set up Node 🟢
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"
      - name: Install dependencies ⚙️
        run: npm ci
      - name: ESLint Check ⬣
        run: npm run lint:ci
        continue-on-error: true
      - name: Upload ESLint results to GitHub
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: eslint-results.sarif
          wait-for-processing: true
```

## 🛠️ Developer Info

### Dependencies

![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Feslint-config/@next/eslint-plugin-next)
![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Feslint-config/@vitest/eslint-plugin)
![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Feslint-config/eslint-plugin-import)
![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Feslint-config/eslint-plugin-jest-dom)
![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Feslint-config/eslint-plugin-playwright)
![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Feslint-config/eslint-plugin-react)
![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Feslint-config/eslint-plugin-react-hooks)
![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Feslint-config/eslint-plugin-storybook)
![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Feslint-config/eslint-plugin-tailwindcss)
![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Feslint-config/eslint-plugin-testing-library)
![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Feslint-config/globals)
![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Feslint-config/typescript-eslint)
![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Feslint-config/eslint-import-resolver-typescript)

## 📒 Changelog

The [changelog](https://github.com/JanSzewczyk/eslint-config/blob/main/CHANGELOG.md) is regularly updated to reflect
what's changed in each new release.

## 📜 License

This project is licensed under the terms of the
[MIT license](https://github.com/JanSzewczyk/eslint-config/blob/main/LICENSE).
