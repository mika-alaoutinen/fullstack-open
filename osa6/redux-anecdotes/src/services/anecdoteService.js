import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = () =>
  axios.get(url)
    .then(anecdotes => anecdotes.data)
    .catch(error => console.error(error))

const create = anecdote =>
  axios.post(url, anecdote)
    .then(response => response.data)
    .catch(error => console.error(error))

export default { getAll, create }