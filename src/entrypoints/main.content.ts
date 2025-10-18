import { InjectAdapter as CustomEventInjectAdapter } from '@/service/adapter/customEvent';
import { Counter, setupCounterUI } from '@/service/counter';
import { defineProxy } from 'comctx';

export default defineContentScript({
  world: 'MAIN',
  runAt: 'document_start',
  matches: ['*://*.example.com/*'],
  cssInjectionMode: 'ui',

  async main() {
    const [, injectCounter] = defineProxy(() => ({}) as Counter, {
      namespace: 'counter',
    })
    const counter = injectCounter(new CustomEventInjectAdapter())
    // 3. Define your UI
    const ctx = new AbortController() as any;
    ctx.onInvalidated = () => { }
    const ui = await createShadowRootUi(ctx, {
      name: 'main-ui',
      position: 'inline',
      anchor: 'body',
      async onMount(container) {
        // Define how your UI will be mounted inside the container
        await setupCounterUI(container, counter);
      },
    });

    // 4. Mount the UI
    window.addEventListener('load', () => {
      ui.mount();
    })
  },
});
