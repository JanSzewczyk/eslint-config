# @szum-tech/eslint-config

> Github
>
> ![GitHub release (latest by date)](https://img.shields.io/github/v/release/JanSzewczyk/eslint-config-szum-tech) >
> [![GitHub pull requests](https://img.shields.io/github/issues-pr/JanSzewczyk/eslint-config-szum-tech)](https://github.com/JanSzewczyk/eslint-config-szum-tech/pulls) >
> [![GitHub issues](https://img.shields.io/github/issues/JanSzewczyk/eslint-config-szum-tech)](https://github.com/JanSzewczyk/eslint-config-szum-tech/issues) >
> ![GitHub Repo stars](https://img.shields.io/github/stars/JanSzewczyk/eslint-config-szum-tech?style=social)

> Github Actions
>
> [![🚀 publish](https://github.com/JanSzewczyk/eslint-config-szum-tech/actions/workflows/publish.yml/badge.svg?branch=main)](https://github.com/JanSzewczyk/eslint-config-szum-tech/actions/workflows/publish.yml) >
> [![test](https://github.com/JanSzewczyk/eslint-config-szum-tech/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/JanSzewczyk/eslint-config-szum-tech/actions/workflows/test.yml) >
> [![CodeQL](https://github.com/JanSzewczyk/eslint-config-szum-tech/actions/workflows/codeql.yml/badge.svg?branch=main)](https://github.com/JanSzewczyk/eslint-config-szum-tech/actions/workflows/codeql.yml)

> NPM
>
> [![npm](https://img.shields.io/npm/v/@szum-tech/eslint-config-szum-tech)](https://www.npmjs.com/package/@szum-tech/eslint-config-szum-tech) >
> ![npm](https://img.shields.io/npm/dm/@szum-tech/eslint-config-szum-tech)

[![MIT License](https://img.shields.io/badge/license-MIT-red.svg?style=flat)](https://github.com/JanSzewczyk/eslint-config-szum-tech/blob/main/LICENSE)

These are settings for ESLint working as
[shareable config](http://eslint.org/docs/developer-guide/shareable-configs.html).

## What it does 🤔

This setup lints your JavaScript code based on practices. It supports [React](https://reactjs.org/) projects with
typescript and uses plugins like:

![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/JanSzewczyk/eslint-config-szum-tech/eslint-plugin-import)

![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/JanSzewczyk/eslint-config-szum-tech/eslint-plugin-jest)

![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/JanSzewczyk/eslint-config-szum-tech/eslint-plugin-react)

![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/JanSzewczyk/eslint-config-szum-tech/eslint-plugin-react-hooks)

Check the [index.js](https://github.com/JanSzewczyk/eslint-config-szum-tech/blob/main/index.js) file to see what is
included. Feel free to override the rules that make sense for you.

## Installing ⚙️

In your project folder, run:

```
npm i -D @szum-tech/eslint-config-szum-tech
# or yarn install --dev @szum-tech/eslint-config-szum-tech

npx install-peerdeps --dev @szum-tech/eslint-config-szum-tech
```

## Usage

Once the `@szum-tech/eslint-config-szum-tech` package is installed, you can use it by specifying
`@szum-tech/eslint-config-szum-tech` in the
[extends](https://eslint.org/docs/user-guide/configuring/#extending-configuration-files) section of your
[ESLint configuration](https://eslint.org/docs/user-guide/configuring/).

### Set configuration

Use one of following way:

#### 1. Create (or update) a `.eslintrc.yml` file with the following content:

```yaml
extends:
  - "@szum-tech/eslint-config-szum-tech"
```

#### 2. Or add to `package.json` file the following content:

```json
{
  "eslintConfig": {
    "extends": ["@szum-tech/eslint-config-szum-tech"]
  }
}
```

---

### Add scripts to `package.json`

```json
{
  "scripts": {
    "lint": "eslint {**/*,*}.{js,ts,jsx,tsx}",
    "lint:fix": "eslint --fix {**/*,*}.{js,ts,jsx,tsx}"
  }
}
```

## License

MIT © Szum-Tech
