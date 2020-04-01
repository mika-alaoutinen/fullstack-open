import React, { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import ErrorNotification from './components/ErrorNotification'
import Recommendations from './components/Recommendations'
import { ALL_AUTHORS, ALL_BOOKS, DISTINCT_GENRES, USERS_FAVORITE_GENRE } from './graphql/queries'

const App = () => {
  const client = useApolloClient()

  const [page, setPage] = useState('authors')
  const [message, setMessage] = useState(null)
  const [token, setToken] = useState(null)

  const authorQuery = useQuery(ALL_AUTHORS)
  const bookQuery = useQuery(ALL_BOOKS)
  const bookGenresQuery = useQuery(DISTINCT_GENRES)
  const favoriteGenreQuery = useQuery(USERS_FAVORITE_GENRE)

  if (authorQuery.loading || bookQuery.loading || bookGenresQuery.loading || favoriteGenreQuery.loading) {
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

  const renderLoggedInButtons = () => {
    const pages = ['authors', 'books', 'add', 'recommend']
    return (
      <>
        {renderNavButtons(pages)}
        <button onClick={handleLogout()}>logout</button>
      </>
    )
  }

  const renderLoggedOutButtons = () => {
    const pages = ['authors', 'books', 'login']
    return renderNavButtons(pages)
  }

  return (
    <div>
      <div className='navigationButtons'>
        { token ? renderLoggedInButtons() : renderLoggedOutButtons() }
      </div>

      <ErrorNotification
        message={message}
        setMessage={setMessage}
      />

      <Authors
        show={page === 'authors'}
        authors={authorQuery.data.allAuthors}
        setMessage={setMessage}
      />

      <Books
        show={page === 'books'}
        allBooks={bookQuery.data.allBooks}
        genres={bookGenresQuery.data.genres}
      />

      { token
        ? <>
          <NewBook
            show={page === 'add'}
            setMessage={setMessage}
          />

          <Recommendations
            show={page === 'recommend'}
            genre={favoriteGenreQuery.data.me.favoriteGenre}
          />
        </>

        : <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setMessage={setMessage}
        />
      }
    </div>
  )
}

export default App