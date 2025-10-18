import { useState } from 'react';
import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import './App.css';
import { Counter } from '@/service/counter';
import { InjectAdapter as BrowserRuntimeInjectAdapter } from '@/service/adapter/browserRuntime';
import { defineProxy } from 'comctx';

const [, injectCounter] = defineProxy(() => ({}) as Counter, {
  namespace: browser.runtime?.id,
})
const counter = injectCounter(new BrowserRuntimeInjectAdapter())

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    counter.getValue().then((value) => {
      setCount(value)
    })
  }, [])
  counter.onChange((value) => {
    setCount(value)
  })

  return (
    <>
      <div>
        <a href="https://wxt.dev" target="_blank">
          <img src={wxtLogo} className="logo" alt="WXT logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>WXT + React</h1>
      <div className="card">
        <button onClick={() => counter.increment()}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the WXT and React logos to learn more
      </p>
    </>
  );
}

export default App;
