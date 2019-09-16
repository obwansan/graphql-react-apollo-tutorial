import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

class BookList extends Component {

  displayBooks() {
    let data = this.props.data;
    if(data.loading) {
      return ( <div>Loading books...</div>)
    } else {
      return data.books.map(book => {
        return (
          <li key={ book.id }>{ book.name }</li>
        )
      })
    }
  }

  render() {
    // console.log('this.props.data', this.props.data);
    return (
      <div>
        <ul id="book-list">
          {this.displayBooks()}
        </ul>
      </div>
    );
  }
}

// Binds the getBooksQuery query to the BookList component, so we have 
// access in the component to the data object returned by the query.

// THE DATA OBJECT IS STORED ON THE COMPONENT'S PROPS!!!

// Does graphql(getBooksQuery) return a function that is called and passes BookList?
// Not sure as logging graphql(getBooksQuery) doesn't log a function...
// console.log('graphql(getBooksQuery)', graphql(getBooksQuery));
export default graphql(getBooksQuery)(BookList);
