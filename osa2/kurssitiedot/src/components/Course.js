import React from 'react'

// Course component:
const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

// Other components:
const Header = ({name}) => <h2>{name}</h2>

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

export default Course