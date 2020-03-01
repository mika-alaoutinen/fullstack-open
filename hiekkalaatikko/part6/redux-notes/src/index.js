import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import noteReducer from './reducers/noteReducer'
import { createStore } from "redux";

// Redux store:
const store = createStore(noteReducer)

// Create new notes and save them to store:
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

// Change note importance:
store.dispatch({
  type: 'TOGGLE_IMPORTANCE',
  data: { id: 2 },
})

const renderApp = () => {
  ReactDOM.render(<App store={store} />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)