const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'VOTE_NOTIFICATION':
      return {
        reason: action.reason,
        content: action.content
      }
    case 'NEW_ANECDOTE_NOTIFICATION':
      return {
        reason: action.reason,
        content: action.content
      }
    default:
      return state
  }
}

export const voteNotification = content => ({
  type: 'VOTE_NOTIFICATION',
  content: content,
  reason: 'vote'
})

export const newAnecdoteNotification = content => ({
  type: 'NEW_ANECDOTE_NOTIFICATION',
  content: content,
  reason: 'new'
})

export default notificationReducer