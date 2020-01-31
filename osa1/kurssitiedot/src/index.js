import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{ props.course }</h1>
  )
}

const Content = (props) => {
  const p1 = props.parts[0];
  const p2 = props.parts[1];
  const p3 = props.parts[2];

  return (
    <div>
      <Part name={p1.name} exercises={p1.exercises} />
      <Part name={p2.name} exercises={p2.exercises} />
      <Part name={p3.name} exercises={p3.exercises} />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{ props.name } { props.exercises }</p>
  )
}

const Total = (props) => {
  const sum = props.parts
      .map(part => part.exercises)
      .reduce((current, previous) => current + previous, 0)

  return (
    <p>Number of exercises { sum }</p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))