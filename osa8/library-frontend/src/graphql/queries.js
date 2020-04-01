import { gql } from '@apollo/client'

// Fragments:
export const AUTHOR_DETAILS = gql`
  fragment authorDetails on Author {
    name
    born
    bookCount
    id
  }
`

export const BOOK_DETAILS = gql`
  fragment bookDetails on Book {
    title
    author {
      name
      bookCount
      id
    }
    published
    genres
    id
  }
`

// Queries:
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...authorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const DISTINCT_GENRES = gql`
  query {
    genres
  }
`

export const USERS_FAVORITE_GENRE = gql`
  query {
    me {
      favoriteGenre
    }
  }
`

// Mutations:
export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres
    ) {
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      ...authorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

// Subscriptions:
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
`