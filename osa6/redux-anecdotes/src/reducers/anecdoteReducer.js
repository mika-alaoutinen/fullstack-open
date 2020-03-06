const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return vote(state, action)
    case 'NEW_ANECDOTE':
      return [ ...state, action.data ]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state;
  }
}

export const addVote = id => ({
  type: 'VOTE',
  id: id
})

export const createAnecdote = data => ({
  type: 'NEW_ANECDOTE',
  data
})

export const initAnecdotes = anecdotes => ({
  type: 'INIT_ANECDOTES',
  data: anecdotes
})

// Utility functions:
const vote = (state, action) => {
  const id = action.id
  const anecdote = state.find(anecdote => anecdote.id === id)
  const newAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }

  return state.map(anecdote => anecdote.id === id ? newAnecdote : anecdote)
}

export default anecdoteReducer