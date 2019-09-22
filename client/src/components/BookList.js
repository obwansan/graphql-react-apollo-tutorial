import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

// Components
import BookDetails from './BookDetails';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    }
  // console.log("this.state", this.state);

  }

  displayBooks() {
    let data = this.props.data;
    console.log("TCL: BookList -> displayBooks -> this.props.data.books", this.props.data.books)
    if(data.loading) {
      return ( <div>Loading books...</div>)
    } else {
      return data.books.map(book => {
        return (
          <li key={ book.id } onClick={(e) => {this.setState({selected: book.id})}}>{ book.name }</li>
        )
      })
    }
  }

  render() {
    return (
      <div>
        <ul id="book-list">
          {this.displayBooks()}
        </ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

// Binds the getBooksQuery query to the BookList component, so we have 
// access in the component to the data object returned by the query.

// THE DATA OBJECT IS STORED ON THE COMPONENT'S PROPS (this.props.data)!!!

// Does graphql(getBooksQuery) return a function that is called and passed BookList?
// Not sure as logging graphql(getBooksQuery) doesn't log a function...
// console.log('graphql(getBooksQuery)', graphql(getBooksQuery));
export default graphql(getBooksQuery)(BookList);
