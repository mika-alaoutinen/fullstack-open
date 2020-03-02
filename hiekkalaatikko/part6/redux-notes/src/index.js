import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import filterReducer from './reducers/filterReducer'
import noteReducer from './reducers/noteReducer'
import { createStore, combineReducers } from 'redux'

// Combine reducer:
const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
})

// Redux store:
const store = createStore(reducer)

const renderApp = () => {
  ReactDOM.render(<App store={store} />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)