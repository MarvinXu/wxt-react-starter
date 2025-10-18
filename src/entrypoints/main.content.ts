export default defineContentScript({
  world: 'MAIN',
  runAt: 'document_start',
  matches: ['*://*.example.com/*'],
  main() {
    console.log('Hello main content.');
  },
});
