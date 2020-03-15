const blogs = [
  {
    id: '5a451df7571c224a31b5c8cf',
    title: 'PHP bad',
    author: 'Mika',
    url: 'blogi.fi/php-bad',
    likes: 4,
    user: {
      _id: '5a451df7571c224a31b5c8ce',
      username: 'admin',
      name: 'Mika'
    },
  },
  {
    id: '5a451df7571c224a31b5c8cg',
    title: 'Java good',
    author: 'Mika',
    url: 'blogi.fi/java-good',
    likes: 10,
    user: {
      _id: '5a451e21e0b8b04a45638211',
      username: 'admin',
      name: 'Mika'
    },
  },
]

const getAll = () => Promise.resolve(blogs)

const setToken = newToken => localStorage.setItem(newToken)

export default { getAll, setToken }