export default defineContentScript({
  matches: ['*://*.example.com/*'],
  main() {
    console.log('Hello content.');
  },
});
