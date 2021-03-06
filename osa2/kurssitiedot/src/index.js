import React from 'react'
import ReactDOM from 'react-dom'
import Course from "./components/Course";

const App = () => {
  const courses = [
    {
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
    },
    {
      name: 'Node.js',
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const courseRows = courses.map(course =>
    <Course key={course.name} course={course} />
  )

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courseRows}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))