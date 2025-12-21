import { defineConfig } from 'wxt';

// FYI: This repo uses v0.20, which incorporates breaking changes
// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  srcDir: 'src',
  publicDir: 'public',
  modulesDir: 'modules',
});
