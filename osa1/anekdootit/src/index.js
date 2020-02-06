import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({anecdote, votes}) => {
  return (
    <>
      {anecdote}
      <p>has {votes} votes</p>
    </>
  )
}

const VoteButton = ({votes, setVotes, selected}) => {
  const enterVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  return <button onClick={enterVote}>vote</button>
}

const NextAnecdoteButton = ({setSelected, getRandom}) => {
  const nextAnecdote = () => setSelected(getRandom)
  return <button onClick={nextAnecdote}>next anecdote</button>
}

const MostVoted = ({anecdotes, votes}) => {
  const mostVotedIndex = votes.indexOf(Math.max(...votes)) 
  return anecdotes[mostVotedIndex]
}

const App = ({ anecdotes }) => {
  const getRandom = () => Math.floor((Math.random() * anecdotes.length))

  // State management:
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(getRandom)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <p>
        <VoteButton votes={votes} setVotes={setVotes} selected={selected} />
        <NextAnecdoteButton setSelected={setSelected} getRandom={getRandom} />
      </p>
      <h1>Anecdote with most votes</h1>
      <MostVoted anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)