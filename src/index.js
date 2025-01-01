import importPlugin from "eslint-plugin-import";
import jestDomPlugin from "eslint-plugin-jest-dom";
import playwrightPlugin from "eslint-plugin-playwright";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import storybookPlugin from "eslint-plugin-storybook";
import tailwindcssPlugin from "eslint-plugin-tailwindcss";
import testingLibraryPlugin from "eslint-plugin-testing-library";
import globals from "globals";
import tsEslint from "typescript-eslint";

import nextPlugin from "@next/eslint-plugin-next";
import vitestPlugin from "@vitest/eslint-plugin";

const ERROR = "error";
const WARN = "warn";
const OFF = "off";

const has = (pkg) => {
  try {
    import.meta.resolve(pkg, import.meta.url);
    return true;
  } catch {
    return false;
  }
};

const hasTypeScript = has("typescript");
const hasTailwindcss = has("tailwindcss");
const hasReact = has("react");
const hasNext = has("next");
const hasTestingLibrary = has("@testing-library/dom");
const hasJestDom = has("@testing-library/jest-dom");
const hasVitest = has("vitest");
const hasPlaywright = has("@playwright/test");
const hasStorybook = has("storybook");

const typeScriptExtensions = [".ts", ".cts", ".mts", ".tsx"];
const allExtensions = [...typeScriptExtensions, ".js", ".jsx", ".mjs", ".cjs"];

const vitestFiles = ["**/__tests__/**/*", "**/*.test.*"];
const testFiles = ["**/tests/**", ...vitestFiles];
const playwrightFiles = ["**/e2e/**", "**/*.e2e.*"];

const config = [
  {
    name: "eslint/ignores",
    ignores: [
      "**/.cache/**",
      "**/node_modules/**",
      "**/build/**",
      "**/public/build/**",
      "**/playwright-report/**",
      "**/server-build/**",
      "**/dist/**",
      "**/.next/**"
    ]
  },

  {
    name: "eslint/config/base&import",
    plugins: {
      import: importPlugin.flatConfigs.recommended.plugins.import
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false
      }
    },
    rules: {
      "no-unexpected-multiline": ERROR,
      "no-warning-comments": [ERROR, { terms: ["FIXME"], location: "anywhere" }],
      "no-console": WARN,
      "no-unused-vars": [
        WARN,
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^ignored"
        }
      ],

      // analysis/correctness
      "import/default": ERROR,
      "import/namespace": ERROR,
      "import/export": ERROR,
      "import/no-unresolved": OFF,
      "import/named": OFF,

      // red flags (thus, warnings)
      "import/consistent-type-specifier-style": [WARN, "prefer-inline"],
      "import/no-named-as-default": WARN,
      "import/no-named-as-default-member": WARN,
      "import/no-duplicates": [WARN, { "prefer-inline": true }],
      "import/order": [
        WARN,
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before"
            },
            { pattern: "*/**", group: "internal" }
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true
          }
        }
      ]
    }
  },

  hasReact
    ? {
        name: "eslint/config/react&react-hooks",
        files: ["**/*.tsx", "**/*.jsx"],
        plugins: {
          react: reactPlugin,
          "react-hooks": reactHooksPlugin
        },
        languageOptions: {
          parser: tsEslint.parser,
          parserOptions: {
            jsx: true
          }
        },
        settings: {
          react: {
            version: "detect"
          }
        },
        rules: {
          "react/display-name": ERROR,
          "react/jsx-no-comment-textnodes": ERROR,
          "react/jsx-no-duplicate-props": ERROR,
          "react/jsx-no-target-blank": ERROR,
          "react/jsx-no-undef": ERROR,
          "react/jsx-uses-react": ERROR,
          "react/jsx-uses-vars": ERROR,
          "react/no-children-prop": ERROR,
          "react/no-danger-with-children": ERROR,
          "react/no-deprecated": ERROR,
          "react/no-direct-mutation-state": ERROR,
          "react/no-find-dom-node": ERROR,
          "react/no-is-mounted": ERROR,
          "react/no-render-return-value": ERROR,
          "react/no-unescaped-entities": ERROR,
          "react/no-unknown-property": ERROR,
          "react/require-render-return": ERROR,
          "react/jsx-key": WARN,
          "react/react-in-jsx-scope": OFF,
          "react/no-unsafe": OFF,

          "react-hooks/rules-of-hooks": ERROR,
          "react-hooks/exhaustive-deps": WARN
        }
      }
    : null,

  hasTailwindcss
    ? {
        name: "eslint/config/tailwindcss",
        plugins: {
          tailwindcss: tailwindcssPlugin
        },
        languageOptions: {
          parserOptions: {
            ecmaFeatures: {
              jsx: true
            }
          }
        },
        rules: {
          "tailwindcss/no-contradicting-classname": ERROR,
          "tailwindcss/classnames-order": WARN,
          "tailwindcss/enforces-negative-arbitrary-values": WARN,
          "tailwindcss/enforces-shorthand": WARN,
          "tailwindcss/migration-from-tailwind-2": WARN,
          "tailwindcss/no-custom-classname": WARN,
          "tailwindcss/no-unnecessary-arbitrary-value": WARN,
          "tailwindcss/no-arbitrary-value": OFF
        }
      }
    : null,

  hasNext
    ? {
        name: "eslint/config/next",
        files: ["**/*.ts?(x)", "**/*.js?(x)"],
        plugins: {
          "@next/next": nextPlugin
        },
        rules: {
          "@next/next/inline-script-id": ERROR,
          "@next/next/no-assign-module-variable": ERROR,
          "@next/next/no-document-import-in-page": ERROR,
          "@next/next/no-duplicate-head": ERROR,
          "@next/next/no-head-import-in-document": ERROR,
          "@next/next/no-script-component-in-head": ERROR,
          "@next/next/google-font-display": WARN,
          "@next/next/google-font-preconnect": WARN,
          "@next/next/next-script-for-ga": WARN,
          "@next/next/no-async-client-component": WARN,
          "@next/next/no-before-interactive-script-outside-document": WARN,
          "@next/next/no-css-tags": WARN,
          "@next/next/no-head-element": WARN,
          "@next/next/no-html-link-for-pages": WARN,
          "@next/next/no-img-element": WARN,
          "@next/next/no-page-custom-font": WARN,
          "@next/next/no-styled-jsx-in-document": WARN,
          "@next/next/no-sync-scripts": WARN,
          "@next/next/no-title-in-document-head": WARN,
          "@next/next/no-typos": WARN,
          "@next/next/no-unwanted-polyfillio": WARN
        }
      }
    : null,

  hasTypeScript
    ? {
        name: "eslint/config/typescript",
        files: ["**/*.ts?(x)"],
        languageOptions: {
          parser: tsEslint.parser,
          parserOptions: {
            projectService: true
          },
          sourceType: "module"
        },
        plugins: {
          "@typescript-eslint": tsEslint.plugin
        },
        settings: {
          "import/extensions": allExtensions,
          "import/external-module-folders": ["node_modules", "node_modules/@types"],
          "import/parsers": {
            "@typescript-eslint/parser": typeScriptExtensions
          },
          "import/resolver": {
            node: {
              extensions: allExtensions
            }
          }
        },
        rules: {
          "no-unused-expressions": OFF,
          "no-array-constructor": OFF,
          "no-unused-vars": OFF,

          "@typescript-eslint/no-misused-promises": [ERROR, { checksVoidReturn: false }],
          "@typescript-eslint/no-floating-promises": ERROR,
          "@typescript-eslint/ban-ts-comment": ERROR,
          "@typescript-eslint/no-array-constructor": ERROR,
          "@typescript-eslint/no-duplicate-enum-values": ERROR,
          "@typescript-eslint/no-explicit-any": ERROR,
          "@typescript-eslint/no-extra-non-null-assertion": ERROR,
          "@typescript-eslint/no-misused-new": ERROR,
          "@typescript-eslint/no-namespace": ERROR,
          "@typescript-eslint/no-non-null-asserted-optional-chain": ERROR,
          "@typescript-eslint/no-require-imports": ERROR,
          "@typescript-eslint/no-this-alias": ERROR,
          "@typescript-eslint/no-unnecessary-type-constraint": ERROR,
          "@typescript-eslint/no-unsafe-declaration-merging": ERROR,
          "@typescript-eslint/no-unsafe-function-type": ERROR,
          "@typescript-eslint/no-wrapper-object-types": ERROR,
          "@typescript-eslint/prefer-as-const": "error",
          "@typescript-eslint/prefer-namespace-keyword": ERROR,
          "@typescript-eslint/triple-slash-reference": ERROR,
          "@typescript-eslint/no-empty-object-type": WARN,
          "@typescript-eslint/no-unused-vars": [
            WARN,
            {
              args: "all",
              argsIgnorePattern: "^_",
              caughtErrors: "all",
              caughtErrorsIgnorePattern: "^_",
              destructuredArrayIgnorePattern: "^_",
              varsIgnorePattern: "^_",
              ignoreRestSiblings: true
            }
          ],
          "@typescript-eslint/consistent-type-imports": [
            WARN,
            {
              prefer: "type-imports",
              disallowTypeAnnotations: true,
              fixStyle: "inline-type-imports"
            }
          ]
        }
      }
    : null,

  hasTestingLibrary
    ? {
        name: "eslint/config/testing-library",
        files: testFiles,
        ignores: playwrightFiles,
        plugins: {
          "testing-library": testingLibraryPlugin
        },
        rules: {
          "testing-library/no-unnecessary-act": [ERROR, { isStrict: false }],
          "testing-library/no-wait-for-side-effects": ERROR,
          "testing-library/prefer-find-by": ERROR
        }
      }
    : null,

  hasJestDom
    ? {
        name: "eslint/config/jest-dom",
        files: testFiles,
        ignores: playwrightFiles,
        plugins: {
          "jest-dom": jestDomPlugin
        },
        rules: {
          "jest-dom/prefer-checked": ERROR,
          "jest-dom/prefer-enabled-disabled": ERROR,
          "jest-dom/prefer-focus": ERROR,
          "jest-dom/prefer-empty": ERROR,
          "jest-dom/prefer-to-have-value": ERROR,
          "jest-dom/prefer-to-have-text-content": ERROR,
          "jest-dom/prefer-required": ERROR
        }
      }
    : null,

  hasVitest
    ? {
        name: "eslint/config/vitest",
        files: testFiles,
        ignores: playwrightFiles,
        plugins: {
          vitest: vitestPlugin
        },
        settings: {
          vitest: {
            typecheck: hasTypeScript
          }
        },
        languageOptions: {
          globals: {
            ...vitestPlugin.environments.env.globals
          }
        },
        rules: {
          "vitest/expect-expect": ERROR,
          "vitest/no-identical-title": ERROR,
          "vitest/no-commented-out-tests": ERROR,
          "vitest/valid-title": ERROR,
          "vitest/valid-expect": ERROR,
          "vitest/valid-describe-callback": ERROR,
          "vitest/require-local-test-context-for-concurrent-snapshots": ERROR,
          "vitest/no-import-node-test": ERROR,
          "vitest/no-focused-tests": [WARN, { fixable: false }]
        }
      }
    : null,

  hasPlaywright
    ? {
        name: "eslint/config/playwright",
        files: playwrightFiles,

        plugins: {
          playwright: playwrightPlugin
        },
        languageOptions: {
          globals: globals["shared-node-browser"]
        },
        rules: {
          "no-empty-pattern": OFF,

          "playwright/missing-playwright-await": ERROR,
          "playwright/no-focused-test": ERROR,
          "playwright/no-networkidle": ERROR,
          "playwright/no-unsafe-references": ERROR,
          "playwright/valid-describe-callback": ERROR,
          "playwright/valid-expect": ERROR,
          "playwright/valid-expect-in-promise": ERROR,
          "playwright/valid-title": ERROR,
          "playwright/prefer-web-first-assertions": ERROR,
          "playwright/no-standalone-expect": ERROR,
          "playwright/expect-expect": WARN,
          "playwright/max-nested-describe": WARN,
          "playwright/no-conditional-expect": WARN,
          "playwright/no-conditional-in-test": WARN,
          "playwright/no-element-handle": WARN,
          "playwright/no-eval": WARN,
          "playwright/no-force-option": WARN,
          "playwright/no-nested-step": WARN,
          "playwright/no-page-pause": WARN,
          "playwright/no-skipped-test": WARN,
          "playwright/no-useless-await": WARN,
          "playwright/no-useless-not": WARN,
          "playwright/no-wait-for-selector": WARN,
          "playwright/no-wait-for-timeout": WARN
        }
      }
    : null,

  hasStorybook
    ? {
        name: "eslint/config/storybook",
        plugins: {
          storybook: storybookPlugin
        }
      }
    : null,
  hasStorybook
    ? {
        name: "eslint/config/storybook/stories",
        files: ["**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)", "**/*.story.@(ts|tsx|js|jsx|mjs|cjs)"],
        rules: {
          "storybook/await-interactions": ERROR,
          "storybook/context-in-play-function": ERROR,
          "storybook/default-exports": ERROR,
          "storybook/story-exports": ERROR,
          "storybook/use-storybook-expect": ERROR,
          "storybook/use-storybook-testing-library": ERROR,
          "storybook/no-redundant-story-name": WARN,
          "storybook/prefer-pascal-case": WARN,
          "storybook/hierarchy-separator": WARN,
          "react-hooks/rules-of-hooks": OFF,
          "import/no-anonymous-default-export": OFF
        }
      }
    : null,
  hasStorybook
    ? {
        name: "eslint/config/storybook/main",
        files: [".storybook/main.@(js|cjs|mjs|ts|tsx)"],
        rules: {
          "storybook/no-uninstalled-addons": ERROR
        }
      }
    : null
].filter(Boolean);

export default config;
