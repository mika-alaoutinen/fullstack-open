const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'ERROR':
      return action.notification
    case 'MESSAGE':
      return action.notification
    default:
      return state
  }
}

// Action creators:
export const setError = message => async dispatch => {
  dispatch({
    type: 'ERROR',
    notification: {
      message,
      error: true,
      timeout: 3000
    }
  })
}

export const resetError = () => async dispatch => {
  dispatch({
    type: 'ERROR',
    notification: {
      message: null,
      error: true,
    }
  })
}

export const setMessage = message => async dispatch => {
  dispatch({
    type: 'MESSAGE',
    notification: {
      message,
      error: false,
      timeout: 3000
    }
  })
}

export const resetMessage = () => async dispatch => {
  dispatch({
    type: 'MESSAGE',
    notification: {
      message: null,
      error: false,
    }
  })
}

export default notificationReducer