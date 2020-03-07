import anecdoteService from '../services/anecdoteService'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map(anecdote =>
        anecdote.id === action.anecdote.id ? action.anecdote : anecdote)
    case 'NEW_ANECDOTE':
      return [ ...state, action.anecdote ]
    case 'INIT_ANECDOTES':
      return action.anecdotes
    default:
      return state;
  }
}

export const addVote = anecdote => async dispatch => {
  const votedAnecdote = {
    ...anecdote,
    votes: anecdote.votes +1
  }

  const updatedAnecdote = await anecdoteService.update(votedAnecdote.id, votedAnecdote)
  dispatch({
    type: 'VOTE',
    anecdote: updatedAnecdote,
  })
}

export const createAnecdote = anecdote => async dispatch => {
  const newAnecdote = await anecdoteService.create(anecdote)
  dispatch({
    type: 'NEW_ANECDOTE',
    anecdote: newAnecdote
  })
}

export const initAnecdotes = () => async dispatch => {
  const anecdotes = await anecdoteService.getAll()
  dispatch({
    type: 'INIT_ANECDOTES',
    anecdotes
  })
}

export default anecdoteReducer