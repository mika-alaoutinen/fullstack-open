import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore } from "redux";

const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    state.push(action.data)
    return state
  }

  return state
}

// Redux store:
const store = createStore(noteReducer)

// Test:
store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

const renderApp = () => {
  ReactDOM.render(<App store={store} />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)