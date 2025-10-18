import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-react'],
  webExt: {
    startUrls: ['http://www.example.com/'],
    openConsole: true,
  },
  manifest: {
    permissions: ['tabs', 'webNavigation'],
  }
});
