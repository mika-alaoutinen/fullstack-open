import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

// Redux-store:
const store = createStore(counterReducer)

const renderApp = () => {
  ReactDOM.render(<App store={store} />, document.getElementById('root'));
}

renderApp()
store.subscribe(renderApp)