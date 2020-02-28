import axios from 'axios'
const baseUrl = '/api/blogs'

// Auth token:
let token = null
const setToken = newToken => token = `bearer ${newToken}`

const createHeader = () => ({
  headers: { Authorization: token }
})

// CRUD requests:
const getAll = () =>
  axios.get(baseUrl, createHeader())
       .then(response => response.data)

const addBlog = newBlog =>
  axios.post(baseUrl, newBlog, createHeader())
       .then(response => response.data)

const editBlog = (id, editedBlog) =>
  axios.put(baseUrl + '/' + id, editedBlog, createHeader())
       .then(response => response.data)

export default { getAll, addBlog, editBlog, setToken }