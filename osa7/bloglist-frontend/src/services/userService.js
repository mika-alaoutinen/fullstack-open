import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () =>
  axios.get(baseUrl)
    .then(response => response.data)
    .catch(error => console.error(error))

export default { getAll }