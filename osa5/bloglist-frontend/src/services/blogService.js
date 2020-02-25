import axios from 'axios'
const baseUrl = '/api/blogs'

// Auth token:
let token = null
const setToken = newToken => token = `bearer ${newToken}`

const createHeader = async () => ({
  headers: { Authorization: token }
})

// CRUD requests:
const getAll = () =>
  axios.get(baseUrl, createHeader())
       .then(response => response.data)

export default { getAll, setToken }