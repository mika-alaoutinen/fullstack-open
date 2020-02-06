import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// Components:
const Button = ({onClick, text}) => (
    <button onClick={onClick}>{text}</button>
  )

const Statistic = ({text, value}) => <p>{text} {value}</p>

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const avg = (good - bad) / all
  const positive = (good / all) * 100 + " %"

  return all === 0
    ? <p>No feedback given</p>
    : <div>
        <h1>statistics</h1>
        <Statistic text="good" value={good}/>
        <Statistic text="neutral" value={neutral}/>
        <Statistic text="bad" value={bad}/>
        
        <Statistic text="all" value={all}/>
        <Statistic text="average" value={avg}/>
        <Statistic text="positive" value={positive}/>
      </div>
}

const App = () => {
  // State management:
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)

  // Event handlers:
  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good"/>
      <Button onClick={handleNeutral} text="neutral"/>
      <Button onClick={handleBad} text="bad"/>

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)