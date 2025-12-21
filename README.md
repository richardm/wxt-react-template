# An opinionated golden template for WXT + React + pnpm projects

**Purpose**: This is a baseline GitHub template I can use to scaffold new browser extension projects. It builds on the Getting Started guide and adds some opinionated improvements as documented below.

### Steps performed in creating this template

- Run `npx wxt@latest init .`
- Run `pnpm run postinstall`
- Updated `.gitignore` to allow checking in the `.vscode` directory.
- Add a custom `.prettierrc` file and updated default file formatting
- Moved source code into `src` directory and updated the `wxt.config.ts`
- Install `vitest` and add `vitest.config.ts` for unit tests
- Add `playwright`, `@playwright/test`, and `playright.config.ts` for E2E tests. Add the e2e dir with example test from the WXT example repo with slight modifications to adhere to E2E testing opinions below.
- Add custom Cursor rule for E2E tests

Note that entrypoints must be named `{entrypoint}.{ext}` or `{entrpoint}/index.{ext}`. e.g. `background.ts` or `background/index.tsx`

As of v0.20, there is a lot of magic to auto-import dependencies, and you must run the `npm run postinstall` script. I'm not sure I'm a fan of all this magic, but I'm giving it a shot.

To get started, just run `pnpm run dev`

## Running E2E Tests

You'll need to build the extension before running E2E tests. These tests should ideally be run as part of a CI/CD pipeline rather than running continuously during active local development. Use unit / integration tests wherever possible for that.

Before running the E2E tests, install dependencies and build the project as usual. Also install any playwright browser(s) needed. This is a one-time event.

```
pnpm i
pnpm build
pnpm exec playwright install
```

Every time you want to run the e2e tests against changes, first re-build the code, then run it either in headless mode or with the Playwright UI. Launching the UI will allow you to run specific tests via the Playwright UI.

```
pnpm build
pnpm e2e
pnpm e2e --ui
```

An improved DX for running E2E tests while fixing bugs is to use two terminals:

1. First run `pnpm e2e --ui` to open the Playwright test runner.
2. In a second terminal, run `pnpm build` after every change.

This allows you to re-use the Playwright UI to re-run specific tests against the newly build code.

### An Opinionated stance on automated testing:

Because the goal is to use coding agents wherever possible, I am imposing a rule to locate items by `data-testid` wherever possible. These test selectors are the most resilient to application changes, as the test will continue to pass, even if the button name or contents of the text displayed changes. The goal is to be able to safely auto-merge and auto-deploy code changes made by agents all the way to prod if the automated test suites pass and if the entire existing test suite passes without modification, then it ensures no regressions for previously tested functionality. However, if the E2E test or the selector is modified as part of a PR, then this requires more careful human review. In the past, one downside to QEs using testids is it required SWEs to add them to DOM elements. Now that agents are writing most-code, this has become a non-issue. This allows agents to refactor at will, and as long as the E2E tests still pass without changes, it's safe from regressions.

The exception to this rule is testing core user flows like sign in or reset email, which change infrequently. For these, it can make sense to test by role.

We can get the best of both by combining approaches:

- First select by testid, then (if we care about the wording), assert that the contained text matches. For example: `page.getByTestId('signin-button')`

This aligns largely with Playwright's Best Practices, updated for AI coding agents: https://playwright.dev/docs/best-practices

> This is an _opinion_ I am testing. I may change it if it does not achieve its primary intended goal of reducing manual human review.
