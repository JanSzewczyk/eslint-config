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

## 📚 Features

- [Opinionated code formatter with support for: JavaScript, Typescript, JSX, ...](https://eslint.org/)
- [Support linting of ES2015+ (ES6+) import/export syntax, and prevent issues with misspelling of file paths and import names](https://www.npmjs.com/package/eslint-plugin-import)
- [Typescript support](https://typescript-eslint.io/packages/typescript-eslint/) - **only** if
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

- [@szum-tech/eslint-config](#szum-techeslint-config)
  - [📚 Features](#-features)
  - [📖 Table of Contents](#-table-of-contents)
  - [🎯 Getting Started](#-getting-started)
    - [⚙️ Installation](#-installation)
    - [Configuration](#configuration)
  - [💻 Scripts](#-scripts)
  - [🚀 Minimal GitHub ESlint check workflow](#-minimal-github-eslint-check-workflow)
  - [🛠️ Developer Info](#-developer-info)
    - [Dependencies](#dependencies)
  - [Changelog](#changelog)
  - [📜 License](#-license)
  <!-- TOC -->

## 🎯 Getting Started

### ⚙️ Installation

[@szum-tech/eslint-config](https://github.com/JanSzewczyk/eslint-config) is available as
[npm package](https://www.npmjs.com/package/@szum-tech/eslint-config).

```shell
# NPM
npm install --save-dev eslint @szum-tech/eslint-config

# YARN
yarn add -D eslint @szum-tech/eslint-config

# PNPM
pnpm add --save-dev eslint @szum-tech/eslint-config

# BUN
bun add --dev eslint @szum-tech/eslint-config
```

### Configuration

Basic information needed to understand, how to set up eslint configuration, you are able to find in
[Configuration Files](https://eslint.org/docs/latest/use/configure/configuration-files) documentation.

A `@szum-tech/eslint-config` is an npm package that exports a configuration object or array.

**`@szum-tech/eslint-config` could be set via either:**

- A `eslint.config.(js|cjs|mjs)` file that exports an array

**The following examples show how to integrate configuration in project:**

- Via `eslint.config.mjs` file:

Once you use a predefined configuration, you can export the entire configuration.

```js
export { default } from "@szum-tech/eslint-config";
```

`@szum-tech/eslint-config` is flexible enough to allow for configuration extensions. You’ll need to use the spread
operator to insert those items into the configuration array.

```js
// eslint.config.js
import szumTechEslintConfig from "@szum-tech/eslint-config";

export default [
  ...szumTechEslintConfig,

  // your modifications
  {
    rules: {
      "no-unused-vars": "warn"
    }
  }
];
```

- Via `eslint.config.cjs` file:

```js
module.exports = require("@szum-tech/semantic-release-config/with-npm");
```

OR, extends

```js
const szumTechEslintConfig = require("@szum-tech/semantic-release-config/with-npm");

module.exports = [
  ...szumTechEslintConfig,

  // your modifications
  {
    rules: {
      "no-unused-vars": "warn"
    }
  }
];
```

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

## 🚀 Minimal GitHub ESlint check workflow

Here are the minimal steps required to run an ESlint check. Creating or adding any content to a PR will trigger this
event. Not only will this action validate the code and return its results, but it will also add highlighted parts of the
code that have an error to the comments under the PR thanks to the `Upload Eslint results to GitHub` step, which uses
`github/codeql-action/upload-sarif`.

```yaml
name: PR Checks ✅

on:
  pull_request:

jobs:
  lint:
    name: ESlint ⬣
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        node-version: [22.x]
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
      - name: ESlint Check ⬣
        run: npm run lint:ci
        continue-on-error: true
      - name: Upload ESlint results to GitHub
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

## Changelog

The [changelog](https://github.com/JanSzewczyk/eslint-config/blob/main/CHANGELOG.md) is regularly updated to reflect
what's changed in each new release.

## 📜 License

This project is licensed under the terms of the
[MIT license](https://github.com/JanSzewczyk/eslint-config/blob/main/LICENSE).
