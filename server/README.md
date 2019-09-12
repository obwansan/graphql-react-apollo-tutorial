## Run the application
`node app`
or
`nodemon app`

# Launch GraphiQL
Set the graphiql property in the graphiqlHTTP middleware in app.js, e.g.
```
app.use('/graphql', graphqlHTTP({
    schema, // es6 shorthand for schema: schema
    graphiql: true // Display the GrapiQL GUI on the localhost:4000 route
}));
```

Go to `localhost:4000/graphql`


