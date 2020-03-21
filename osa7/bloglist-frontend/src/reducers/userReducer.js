import userService from '../services/userService'

const userReducer = (state = [], action) => {
  switch (action.type) {
  case 'GET_USERS':
    return action.users
  case 'INIT_USERS':
    return action.users
  default:
    return state
  }
}

export const initUsers = () => async dispatch => {
  const users = await userService.getAll()
  dispatch({
    type: 'INIT_USERS',
    users
  })
}

export default userReducer