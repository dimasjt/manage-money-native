import React from "react"
import { Provider } from "react-redux"

import Main from "./src/components/Main"
import store from "./src/store"

// only development
let currentValue = store.getState()
store.subscribe(() => {
  let previousValue = currentValue
  currentValue = store.getState()

  if (previousValue !== currentValue) {
    console.log( // eslint-disable-line no-console
      "State",
      previousValue,
      "to",
      currentValue,
    )
  }
})

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
)

export default App