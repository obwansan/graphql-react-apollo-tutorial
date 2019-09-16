import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { compose } from "recompose";
// import {flowRight as compose} from 'lodash';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: ""
    }
  }

  displayAuthors() {
    // console.log("TCL: AddBook -> displayAuthors -> this.props", this.props)
    const data = this.props.getAuthorsQuery;
    if(data.loading) {
      return ( <option disabled>Loading authors...</option>);
    } else {
      return data.authors.map(author => {
        return (<option key={author.id} value={author.id}>{author.name}</option>)
      })
    }
  }

  submitForm(e) {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      // re-calls the getBooksQuery function, which somehow repopulates this component's
      // props (even though the function is just imported and not bound to the component),
      // which causes the component to re-render, thus displaying the added book in the list.
      // Think it works because the getBooksQuery is bound to the BookList component, so when 
      // it's refetched / re-called, the props object on BookList is repopulated with the data 
      // it returns, which causes teh re-renser of the book list.
      refetchQueries: [{query:getBooksQuery}]
    });
  }
    
  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
            <label>Book name: </label>
            <input type="text" onChange={(e) => this.setState({name: e.target.value})} />
        </div>
        <div className="field">
            <label>Genre: </label>
            <input type="text" onChange={(e) => this.setState({genre: e.target.value})} />
        </div>
        <div className="field">
            <label>Author: </label>
            <select onChange={(e) => this.setState({authorId: e.target.value})}>
                <option>Select author</option>
                { this.displayAuthors() }
            </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

// Binds the query to the AddBook component so that response data is available on the props object.
// Use 'compose' from recompose to bind multiple queries / mutations to a component.
// The name you pass is the name of the gql query function available on the props object, e.g
// this.props.addBookMutation(). Can make the name anything you want, but best to give it the 
// name of the gql query function.
export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);