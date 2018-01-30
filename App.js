import React from "react"
import { Provider } from "react-redux"

import Main from "./src/components/Main"
import configureStore from "./src/store"

let store = configureStore()

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