import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const date = new Date()
  
  return (
    <div>
      <p>Hello world</p>
      <p>Se olis { date.toString() }</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))