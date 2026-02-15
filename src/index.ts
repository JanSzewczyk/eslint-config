import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

import { type Linter } from "eslint";
import * as importPlugin from "eslint-plugin-import";
import jestDomPlugin from "eslint-plugin-jest-dom";
import playwrightPlugin from "eslint-plugin-playwright";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import storybookPlugin from "eslint-plugin-storybook";
import testingLibraryPlugin from "eslint-plugin-testing-library";
import globals from "globals";
import tsEslint from "typescript-eslint";

import nextPlugin from "@next/eslint-plugin-next";
import vitestPlugin from "@vitest/eslint-plugin";

const logger = console;

function isPackageInstalled(packageName: string): boolean {
  const currentDir = process.cwd(); // Get the current working directory
  const packageJsonPath = findPackageJson(currentDir);

  if (!packageJsonPath) {
    logger.error("Could not find package.json in", currentDir, "or any parent directory.");
    process.exit(1);
  }

  // Read the package.json file
  try {
    const packageJson = readFileSync(packageJsonPath, "utf-8");
    const parsedPackageJson = JSON.parse(packageJson);

    // Check if the package is listed in dependencies or devDependencies
    const dependencies = parsedPackageJson.dependencies || {};
    const devDependencies = parsedPackageJson.devDependencies || {};

    return packageName in dependencies || packageName in devDependencies;
  } catch (error) {
    logger.error("Error reading package.json file:", error);
    process.exit(1);
  }
}

const PACKAGE_JSON = "package.json";

function findPackageJson(startDir: string): string | null {
  let currentDir = startDir;

  while (true) {
    const packageJsonPath = join(currentDir, PACKAGE_JSON);

    if (existsSync(packageJsonPath)) {
      return packageJsonPath;
    }

    const parentDir = resolve(currentDir, "..");
    if (parentDir === currentDir) {
      // Reached the root of the filesystem
      break;
    }
    currentDir = parentDir;
  }

  return null;
}

const hasTypeScript = isPackageInstalled("typescript");
// Turn off TailwindCSS for now, as it's not yet compatible with Tailwind v4'
const _hasTailwindcss = false;
// const hasTailwindcss = isPackageInstalled("tailwindcss");
const hasReact = isPackageInstalled("react");
const hasNext = isPackageInstalled("next");
const hasTestingLibrary = isPackageInstalled("@testing-library/dom");
const hasJestDom = isPackageInstalled("@testing-library/jest-dom");
const hasVitest = isPackageInstalled("vitest");
const hasPlaywright = isPackageInstalled("@playwright/test");
const hasStorybook = isPackageInstalled("storybook");

const typeScriptExtensions = [".ts", ".cts", ".mts", ".tsx"];
const allExtensions = [...typeScriptExtensions, ".js", ".jsx", ".mjs", ".cjs"];

const vitestFiles = ["**/__tests__/**/*", "**/*.test.*"];
const testFiles = ["**/tests/**", ...vitestFiles];
const playwrightFiles = ["**/e2e/**", "**/*.e2e.*"];

function showFeaturesTable(): void {
  const tableData = [
    { Name: "TypeScript", Status: hasTypeScript ? "\u2714\uFE0F" : "\u274C" },
    { Name: "React", Status: hasReact ? "\u2714\uFE0F" : "\u274C" },
    { Name: "Next", Status: hasNext ? "\u2714\uFE0F" : "\u274C" },
    { Name: "Testing Library", Status: hasTestingLibrary ? "\u2714\uFE0F" : "\u274C" },
    { Name: "Jest Dom", Status: hasJestDom ? "\u2714\uFE0F" : "\u274C" },
    { Name: "Vitest", Status: hasVitest ? "\u2714\uFE0F" : "\u274C" },
    { Name: "Playwright", Status: hasPlaywright ? "\u2714\uFE0F" : "\u274C" },
    { Name: "Storybook", Status: hasStorybook ? "\u2714\uFE0F" : "\u274C" }
  ].sort((a, b) => {
    // Check if Status contains the checkmark
    const aHasCheck = a.Status.includes("\u2714\uFE0F");
    const bHasCheck = b.Status.includes("\u2714\uFE0F");

    // Sort tasks with checkmarks first
    if (aHasCheck && !bHasCheck) {
      return -1;
    } else if (!aHasCheck && bHasCheck) {
      return 1;
    } else {
      return 0;
    }
  });

  logger.log("Hello There!\nHere are the features detected in your project:");

  logger.table(tableData);

  logger.log(`Dear Developer\n`);
  logger.log("Thanks a lot for using '@szum-tech/eslint-config'");
  logger.log("If you like it, leave a star \u2B50 \uD83D\uDC49 https://github.com/JanSzewczyk/handy-szumrak");
  logger.log("And recommend to others\n");
  logger.log(`May the SZUMRAK be with You \uD83D\uDE80\uD83D\uDE80\uD83D\uDE80`);
}

showFeaturesTable();

const ERROR = "error";
const WARN = "warn";
const OFF = "off";

const config = (
  [
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
        "**/.next/**",
        "**/storybook-static/**"
      ]
    },

    {
      name: "eslint/config/base&import",
      plugins: {
        import: importPlugin
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
      settings: hasTypeScript
        ? {
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
          }
        : {},
      rules: {
        "no-unexpected-multiline": ERROR,
        "no-warning-comments": [ERROR, { terms: ["FIXME"], location: "anywhere" }],
        "no-console": WARN,
        "no-unused-vars": [
          WARN,
          {
            args: "all",
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

    // TODO add when support for tailwindcss v4 will be added
    // hasTailwindcss
    //   ? {
    //       name: "eslint/config/tailwindcss",
    //       plugins: {
    //         tailwindcss: tailwindcssPlugin
    //       },
    //       languageOptions: {
    //         parserOptions: {
    //           ecmaFeatures: {
    //             jsx: true
    //           }
    //         }
    //       },
    //       rules: {
    //         "tailwindcss/no-contradicting-classname": ERROR,
    //         "tailwindcss/classnames-order": WARN,
    //         "tailwindcss/enforces-negative-arbitrary-values": WARN,
    //         "tailwindcss/enforces-shorthand": WARN,
    //         "tailwindcss/migration-from-tailwind-2": WARN,
    //         "tailwindcss/no-custom-classname": WARN,
    //         "tailwindcss/no-unnecessary-arbitrary-value": WARN,
    //         "tailwindcss/no-arbitrary-value": OFF
    //       }
    //     }
    //   : null,

    hasNext
      ? {
          name: "eslint/config/next",
          files: ["**/*.ts?(x)", "**/*.js?(x)"],
          plugins: {
            "@next/next": nextPlugin
          },
          rules: {
            ...nextPlugin.configs.recommended.rules
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
            "@typescript-eslint/prefer-as-const": ERROR,
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
            ...(hasReact ? { "react-hooks/rules-of-hooks": OFF } : {}),
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
  ] as (Linter.Config | null)[]
).filter((c): c is Linter.Config => c !== null);

export default config;
