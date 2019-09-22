import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

class BookDetails extends Component {

  displayBookDetails() {
    // this.props.data holds teh data returned by the query
    const { book } = this.props.data;
    if(book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {
              book.author.books.map(book => {
                return <li key={book.id}>{book.name}</li>
              })
            }
          </ul>
        </div>
      )
    } else {
      return <div>No book selected...</div>
    }
  }

  render() {
    console.log("TCL: BookDetails -> displayBookDetails -> this.props.bookId", this.props.bookId)
    return (
      <div id="book-details">
        <div>{this.displayBookDetails()}</div>
      </div>
    );
  }
}

// Bind the getBookQuery query to the BookDetails component so we have 
// access in the component to the data object returned by the query.
// THE DATA OBJECT IS STORED ON THE COMPONENT'S PROPS (this.props.data)!!!. 
// The options function is called whenever props changes (is re-called whenever 
// whatever argument is passed to it changes?). It sets/resets variables used 
// in the query (in this case there's just one, $id). 
// props will change whenever a user clicks on a book
export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails);