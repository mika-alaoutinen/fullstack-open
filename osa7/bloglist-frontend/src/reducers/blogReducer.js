import blogService from '../services/blogService'
import { setError, setMessage } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.id)
  case 'INIT_BLOGS':
    return action.blogs
  case 'LIKE':
    return state.map(blog =>
      blog.id === action.blog.id ? action.blog : blog)
  case 'NEW_BLOG':
    return [ ...state, action.blog ]
  default:
    return state
  }
}

export const deleteBlog = id => async dispatch => {
  await blogService.deleteBlog(id)
  dispatch({
    type: 'DELETE_BLOG',
    id,
  })
}

export const initBlogs = () => async dispatch => {
  const blogs = await blogService.getAll()
  dispatch({
    type: 'INIT_BLOGS',
    blogs
  })
}

export const likeBlog = blog => async dispatch => {
  const likedBlog = {
    ...blog,
    likes: blog.likes + 1
  }

  const updatedBlog = await blogService.editBlog(likedBlog.id, likedBlog)
  dispatch({
    type: 'LIKE',
    blog: updatedBlog
  })
}

export const addBlog = blog => async dispatch => {
  try {
    const newBlog = await blogService.addBlog(blog)

    dispatch({
      type: 'NEW_BLOG',
      blog: newBlog
    })
    
    dispatch(setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`))

  } catch (error) {
    dispatch(setError('Failed to add new blog'))
  }
}

export default blogReducer