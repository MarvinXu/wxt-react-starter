import { InjectAdapter as BrowserRuntimeInjectAdapter } from '@/service/adapter/browserRuntime';
import { ProvideAdapter as CustomEventProvideAdapter } from '@/service/adapter/customEvent';
import { Counter, setupCounterUI } from '@/service/counter';
import { defineProxy } from 'comctx';

export default defineContentScript({
  matches: ['*://*.example.com/*'],
  async main(ctx) {
    const [, injectCounter] = defineProxy(() => ({}) as Counter, {
      namespace: browser.runtime?.id,
    })
    const counter = injectCounter(new BrowserRuntimeInjectAdapter())
    const [provideCounter] = defineProxy(() => counter, {
      namespace: 'counter',
    })
    provideCounter(new CustomEventProvideAdapter())

    const ui = await createShadowRootUi(ctx, {
      name: 'content-ui',
      position: 'inline',
      anchor: 'body',
      async onMount(container) {
        // Define how your UI will be mounted inside the container
        await setupCounterUI(container, counter)
      },
    });

    // 4. Mount the UI
    ui.mount();
  },
});
