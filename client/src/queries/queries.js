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
// The ! means the variable passed into mutation() cannot be null
const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
      id
    }
  }
`

export { getAuthorsQuery, getBooksQuery, addBookMutation };