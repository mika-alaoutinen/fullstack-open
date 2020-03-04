import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import filterReducer from './reducers/filterReducer'
import noteReducer from './reducers/noteReducer'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

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