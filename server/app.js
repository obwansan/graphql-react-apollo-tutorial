const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors  = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

mongoose.connect('mongodb+srv://kobrien:%26oH%23l3%2AJ82@cluster0-8hdhp.mongodb.net/test', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to database');
});

// The graphqlHTTP() function is middleware that handles requests to the /graphql endpoint.
app.use(
  '/graphql',
  graphqlHTTP({
    schema, // es6 shorthand for schema: schema
    graphiql: true // Display the GrapiQL GUI on the localhost:4000 route
  })
);

app.listen(4000, () => {
  console.log('now listenting for requests on port 4000');
});

// Testing cloning, modifying and pushing back to github repo
