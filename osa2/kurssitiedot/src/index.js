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
      },
      {
        name: 'Redux',
        exercises: 11
      }
    ]
  }

  return <div> <Course course={course} /> </div>
}

// Components:
const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({name}) => <h1>{name}</h1>

const Content = ({parts}) => {
  const partRows = parts.map(part =>
    <Part
      key={part.name}
      name={part.name}
      exercises={part.exercises}
    />
  )

  return <div>{partRows}</div>
}

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Total = ({parts}) => {
  const sum = parts
      .map(part => part.exercises)
      .reduce((sum, exercise) => sum + exercise, 0)

  return <p><b>Number of exercises {sum}</b></p>
}

ReactDOM.render(<App />, document.getElementById('root'))