import blogService from '../services/blogService'
import loginService from '../services/loginService'
import { setError } from '../reducers/notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.user
  case 'SET_USER':
    return action.user
  default:
    return state
  }
}

export const userLogin = (username, password) => async dispatch => {
  try {
    const credentials = { username: username.value, password: password.value }
    const user = await loginService.login(credentials)

    blogService.setToken(user.token)
    window.localStorage.setItem('user', JSON.stringify(user))

    dispatch({
      type: 'LOGIN',
      user
    })

  } catch (error) {
    dispatch(setError('wrong username or password'))
  }
}

export const setUser = user => {
  blogService.setToken(user.token)

  return {
    type: 'SET_USER',
    user
  }
}

export default userReducer