import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import App from './App'
import filterReducer from './reducers/filterReducer'
import noteReducer, { initializeNotes } from './reducers/noteReducer'
import noteService from './services/noteService'

// Combine reducer:
const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
})

// Redux store:
const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}> <App/> </Provider>,
  document.getElementById('root')
)