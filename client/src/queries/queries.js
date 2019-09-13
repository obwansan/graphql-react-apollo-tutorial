import { gql } from 'apollo-boost'; // needed to parse queries

// contstruct query
const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`

// contstruct query
const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`

const addBookMutation = gql`
  mutation {
    addBook(name:"", genre:"", authorId:""){
      name
      id
    }
  }
`

export { getAuthorsQuery, getBooksQuery, addBookMutation };