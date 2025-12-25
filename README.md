# WXT React Starter Template

**Purpose**: A baseline GitHub template for scaffolding new browser extension projects. It builds on the WXT Getting Started guide and adds some opinionated improvements as documented below.

### Steps performed in creating this template

TODO Next:

- Add eslint (in progress)
- Add GitHub Actions to run the E2E tests in a CI pipeline
- add `eslint-plugin-jest-dom` for the unit tests
- Note: Adding include to the tsconfig.json file breaks the wxt includes.

### WXT Notes

- Entrypoints must be named `{entrypoint}.{ext}` or `{entrpoint}/index.{ext}`. e.g. `background.ts` or `background/index.tsx`
- As of v0.20, dependencies are auto-imported by default, but you must run the `npm run postinstall` script. Refer to `.wxt/types/imports.d.ts`

## Main commands:

- `pnpm dev` Run dev with HMR
- `pnpm test:unit` Run Vitest unit tests
- `pnpm test:browser` Run Vitest browser tests
- `pnpm test:e2e` Run Playwright E2E tests

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

An improved DX for running E2E tests while fixing bugs is to use two terminals: (FIXME: it generates a new extension ID each time and results in testing stale code. Change this to reuse the same extensionId so I don't need to re-run the command each time)

1. First run `pnpm e2e --ui` to open the Playwright test runner.
2. In a second terminal, run `pnpm build` after every change.

This allows you to re-use the Playwright UI to re-run specific tests against the newly build code.

### An Opinionated stance on automated testing:

> I am currently evaluating this approach and may change it if it does not achieve its primary intended goal of reducing manual human review.

Because the goal is to use coding agents wherever possible, I am imposing a rule to locate items by `data-testid` wherever possible. These test selectors are the most resilient to application changes, as the test will continue to pass, even if the button name or contents of the text displayed changes. The goal is to be able to safely auto-merge and auto-deploy code changes made by agents all the way to prod if the automated test suites pass and if the entire existing test suite passes without modification, then it ensures no regressions for previously tested functionality. However, if the E2E test or the selector is modified as part of a PR, then this requires more careful human review. In the past, one downside to QEs using testids is it required SWEs to add them to DOM elements. Now that agents are writing most-code, this has become a non-issue. This allows agents to refactor at will, and as long as the E2E tests still pass without changes, it's safe from regressions.

The exception to this rule is testing core user flows like sign in or reset email, which change infrequently. For these, it can make sense to test by role.

We can get the best of both by combining approaches:

- First select by testid, then (if we care about the wording), assert that the contained text matches. For example: `page.getByTestId('signin-button')`

This aligns largely with Playwright's Best Practices, updated for AI coding agents: https://playwright.dev/docs/best-practices

## Unit / Integration Tests (WIP):

Historically, I have used React Testing Library. With the rise of vitest-browser-react, I am still learning when to use which, but it appears we now have two good options:

- Continue using the testing library for ordinary tests. This is a node.js simulated DOM (via jsdom) and is fast. Should be used by default.
- Use the vitest browser to access real browser APIs. This uses a real browser (powered by Playwright) but is somewhat slower.

The rule of thumb I am currently using:

- Use testing library for: components, hooks business logic, etc.
- Use vitest-browser only for things that are flaky with testing library or

Note that in the context of browser extensions, vitest-browser-react provides access to Extension APIs, while react testing library does not.

Things `vitest-browser-react` is better at than react-testing-library:

- real clipboard
- real drag and drop
- seeing how content scripts interact with a real page
- messaging between extension contexts

The new testing pyramid:

- test as much as possible as unit tests with `react-testing-library` as usual
- fall back to unit tests against a real browser with `vitest-browser-react` as needed
- test full user journeys with playwright e2e tests

---

### How this works

Unit Tests (Simulated):

- auto-importing works
- uses `@testing-library/jest-dom` custom matchers
- uses `./setup-unit-tests.ts`

Unit Tests (Browser via Playwright):

- must import dependencies manually
- uses `vitest-browser-react`
- uses `./setup-browser-tests.ts`
