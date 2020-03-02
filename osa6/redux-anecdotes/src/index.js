import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import { createStore, combineReducers } from 'redux'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer
})

const store = createStore(reducer)

const render = () => {
  ReactDOM.render(<App store={store} />, document.getElementById('root'))
}

render()
store.subscribe(render)