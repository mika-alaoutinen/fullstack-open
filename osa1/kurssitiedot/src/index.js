import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const parts = [ {part1, exercises1}, {part2, exercises2}, {part3, exercises3} ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{ props.course }</h1>
  )
}

const Content = (props) => {
  const parts = Array.from(props.parts)
  const p1 = parts[0];
  const p2 = parts[1];
  const p3 = parts[2];

  return (
    <div>
      <Part name={p1.part1} exercises={p1.exercises1} />
      <Part name={p2.part2} exercises={p2.exercises2} />
      <Part name={p3.part3} exercises={p3.exercises3} />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{ props.name } { props.exercises }</p>
  )
}

const Total = (props) => {
  const sum = props.exercises.reduce((current, previous) => current + previous, 0)

  return (
    <p>Number of exercises { sum }</p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))