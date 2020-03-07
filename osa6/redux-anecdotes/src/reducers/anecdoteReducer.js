import anecdoteService from '../services/anecdoteService'

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

export const createAnecdote = anecdote => async dispatch => {
  const newAnecdote = await anecdoteService.create(anecdote)
  dispatch({
    type: 'NEW_ANECDOTE',
    data: newAnecdote
  })
}

export const initAnecdotes = () => async dispatch => {
  const anecdotes = await anecdoteService.getAll()
  dispatch({
    type: 'INIT_ANECDOTES',
    data: anecdotes
  })
}

// Utility functions:
const vote = (state, action) => {
  const id = action.id
  const anecdote = state.find(anecdote => anecdote.id === id)
  const newAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }

  anecdoteService.update(id, newAnecdote)

  return state.map(anecdote => anecdote.id === id ? newAnecdote : anecdote)
}

export default anecdoteReducer