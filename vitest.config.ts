import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';
import { WxtVitest } from 'wxt/testing/vitest-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'node:path';

// Reference: https://vitest.dev/guide/browser/
// I thought I could specify the resolvers at the top level, but this did not work and ended up costing me several hours debugging.
export default defineConfig({
  test: {
    projects: [
      {
        plugins: [WxtVitest(), tsconfigPaths()],
        resolve: {
          alias: {
            '@': path.resolve(__dirname, './src'),
          },
        },
        test: {
          setupFiles: ['./setup-unit-tests.ts'],
          include: ['src/**/*.unit.{test,spec}.{ts,tsx}'],
          name: 'unit',
          environment: 'jsdom',
        },
      },
      {
        plugins: [tsconfigPaths()],
        resolve: {
          alias: {
            '@': path.resolve(__dirname, './src'),
          },
        },
        test: {
          include: ['src/**/*.browser.{test,spec}.{ts,tsx}'],
          setupFiles: ['./setup-browser-tests.ts'],
          name: 'browser',
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
