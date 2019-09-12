import React, { Component } from 'react';
import { gql } from 'apollo-boost'; // needed to parse queries
import { graphql } from 'react-apollo';

// contstruct query
const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`

class BookList extends Component {
  render() {
    console.log('this.props', this.props)
    return (
      <div>
        <ul id="book-list">
          <li>Book name</li>
        </ul>
      </div>
    );
  }
}

// Binds the getBooksQuery query to the BookList component, so we have 
// access in the component to all the data returned by the query.
// The data is stored in the component props.
// Does graphql(getBooksQuery) return a function that is called and passes BookList?
// Not sure as logging graphql(getBooksQuery) doesn't log a function...
// console.log('graphql(getBooksQuery)', graphql(getBooksQuery));
export default graphql(getBooksQuery)(BookList);
