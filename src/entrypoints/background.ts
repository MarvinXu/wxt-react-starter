import { ProvideAdapter as BrowserRuntimeProvideAdapter } from '@/service/adapter/browserRuntime';
import { Counter } from '@/service/counter';
import { defineProxy } from 'comctx';

export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });
  // This allows the service-worker to remain resident in the background.
  browser.webNavigation.onHistoryStateUpdated.addListener(() => {
    console.log('background active')
  })
  const [provideCounter] = defineProxy((initialValue: number) => new Counter(initialValue), {
    namespace: browser.runtime?.id,
  })
  const counter = provideCounter(new BrowserRuntimeProvideAdapter(), 0)
  counter.onChange((value) => {
    console.log('counter changed', value)
  })
});
