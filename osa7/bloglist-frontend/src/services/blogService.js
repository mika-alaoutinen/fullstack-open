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
    .catch(error => console.error(error))

const addBlog = newBlog =>
  axios.post(baseUrl, newBlog, createHeader())
    .then(response => response.data)
    .catch(error => console.error(error))

const editBlog = (id, editedBlog) =>
  axios.put(baseUrl + '/' + id, editedBlog, createHeader())
    .then(response => response.data)
    .catch(error => console.error(error))

const deleteBlog = id =>
  axios.delete(baseUrl + '/' + id, createHeader())
    .catch(error => console.error(error))

const addComment = (id, comment) =>
  axios.post(`${baseUrl}/${id}/comments`, comment, createHeader())
    .then(response => response.data)
    .catch(error => console.error(error))

export default {
  getAll, addBlog, editBlog, deleteBlog, addComment, setToken
}