import React from 'react'

const Footer = () => {
  const githubUrl = 'https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js'

  return (
    <div>
      Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -sovelluskehitys</a>.

      See <a href={githubUrl}>{githubUrl}</a> for the source code.
    </div>
  )
}

export default Footer