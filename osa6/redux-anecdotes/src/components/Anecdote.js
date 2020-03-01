import React from 'react'

const Anecdote = ({ anecdote, clickHandler }) => {
  const { content, votes } = anecdote

  return (
    <div>
      {content}
      <div>
        has {votes}
        <button onClick={clickHandler}>vote</button>
      </div>
    </div>
  )
}

export default Anecdote