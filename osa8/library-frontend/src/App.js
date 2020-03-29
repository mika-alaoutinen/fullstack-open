import React, { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import ErrorNotification from './components/ErrorNotification'
import { ALL_AUTHORS, ALL_BOOKS } from './graphql/queries'

const App = () => {
  const client = useApolloClient()
  
  const [page, setPage] = useState('authors')
  const [message, setMessage] = useState(null)
  const [token, setToken] = useState(null)

  const authorQuery = useQuery(ALL_AUTHORS)
  const bookQuery = useQuery(ALL_BOOKS)

  if (authorQuery.loading || bookQuery.loading) {
    return <div>loading</div>
  }

  const handleLogout = () => () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const renderNavButtons = pages => {
    return pages.map(page =>
      <button key={page} onClick={() => setPage(page)}>
        {page}
      </button>
    )
  } 

  const renderLoggedInView = () => {
    const pages = ['authors', 'books', 'add']

    return (
      <div className='loggedInView'>
        <div className='navigationButtons'>
          {renderNavButtons(pages)}
          <button onClick={handleLogout()}>logout</button>
        </div>
        <NewBook show={page === 'add'} />
      </div>
    )
  }

  const renderLoggedOutView = () => {
    const pages = ['authors', 'books', 'login']
    
    return (
      <div className='loggedOutView'>
        <div className='navigationButtons'>
          { renderNavButtons(pages) }
        </div>
        <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setMessage={setMessage}
        />
      </div>
    ) 
  }

  return (
    <div>
      { token ? renderLoggedInView() : renderLoggedOutView() }

      <ErrorNotification
        message={message}
        setMessage={setMessage}
      />

      <Authors
        show={page === 'authors'}
        authors={authorQuery.data.allAuthors}
      />

      <Books
        show={page === 'books'}
        books={bookQuery.data.allBooks}
      />
    </div>
  )
}

export default App