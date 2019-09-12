import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
// react-apollo provides the interface between React and Apollo ('binds' apollo to react)
import { ApolloProvider } from 'react-apollo';

// components
import BookList from './components/BookList';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql' // the endpoint we make requests to from the app
});

class App extends Component {
  render() {
    return (
      // ApolloProvider wraps our app and injects data received from the server into the app
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Ninja's Reading List</h1>
          <BookList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
