const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'RESET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const setNotification = (content, timer) => async dispatch => {
  dispatch({
    type: 'SET_NOTIFICATION',
    notification: {
      content,
      timer
    }
  })
}

export const resetNotification = timeout => async dispatch => {
  setTimeout(() => {
    dispatch({
      type: 'RESET_NOTIFICATION',
      notification: {
        content: '',
        timer: 0
      }
    })
  }, timeout);
}

export default notificationReducer