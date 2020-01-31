import React from 'react'
import ReactDOM from 'react-dom'

const Hello = (props) => {
  return (
    <>
      <p>Hei { props.name }, olet { props.age } vuotta vanha. </p>
    </>
  )
}

const App = () => {
  const nimi = "Pekka"
  const ika = 10;

  return (
    <>
      <h1>Season's greetings</h1>
      <Hello name="Mika" age={20+10}/>
      <Hello name={nimi} age={ika} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))