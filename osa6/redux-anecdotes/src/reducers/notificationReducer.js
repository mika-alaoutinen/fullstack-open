const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return vote(state, action)
    case 'NEW_ANECDOTE':
      return newAnecdote(state, action)
    default:
      return state
  }
}

export const addVote = id => ({
  type: 'VOTE',
  id: id
})

export const createAnecdote = content => ({
  type: 'NEW_ANECDOTE',
  content: content,
})

const vote = (state, action) => {
  console.log(state)
  console.log(action)
}

const newAnecdote = (state, action) => {
  console.log(state)
  console.log(action)
}

export default notificationReducer