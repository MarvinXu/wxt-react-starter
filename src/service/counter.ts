export class Counter {
  public value: number
  constructor(initialValue: number = 0) {
    this.value = initialValue
  }
  async getValue() {
    return this.value
  }
  async onChange(callback: (value: number) => void) {
    let oldValue = this.value
    setInterval(() => {
      const newValue = this.value
      if (oldValue !== newValue) {
        callback(newValue)
        oldValue = newValue
      }
    })
  }
  async increment() {
    return ++this.value
  }
  async decrement() {
    return --this.value
  }
}

export async function setupCounterUI(container: Element, counter: Counter) {
  const counterValue = document.createElement('span')
  counterValue.textContent = await counter.getValue() + ''
  container.append(counterValue)
  const addButton = document.createElement('button')
  addButton.textContent = 'Add'
  container.append(addButton)
  addButton.addEventListener('click', async () => {
    await counter.increment()
  })
  counter.onChange((value) => {
    counterValue.textContent = value.toString()
  })
}