const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

// dummy data
// const books = [
//     {name:'Name of the Wind', genre:'Fantasy', id:'1', authorId: '1'},
//     {name:'The Final Empire', genre:'Fantasy', id:'2', authorId: '2'},
//     {name:'The Long Earth', genre:'Sci-Fi', id:'3', authorId: '3'},
//     {name:'The Hero of Ages', genre:'Fantasy', id:'4', authorId: '2'},
//     {name:'The Colour of Magic', genre:'Fantasy', id:'5', authorId: '3'},
//     {name:'The Light Fantatsic', genre:'Fantasy', id:'6', authorId: '3'}
// ];

// const authors = [
//     {name:'Patrick Rothfuss', age: 44, id:'1'},
//     {name:'Brandon Sanderson', age: 42, id:'2'},
//     {name:'Terry Pratchett', age: 66, id:'3'}
// ];

// Have to "parenthesize the body of a function to return an object literal", e.g. params => ({foo: bar}) (MDN)
// Why do we need to wrap the fields in a function? If not we get an error saying AuthorType or BookType not defined. Seems to be a hoisting thing.
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id:{type: GraphQLID}, // don't have to use string type. It's coerced by JS depending on the type of the returned data.
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: { // can find author associated with books (one-to-many)
            type: AuthorType,
            // 'parent' is the book object that the query has found in books
            resolve(parent, args) {
                // find the author record (in authors collection) whose id corresponds to the authorId of the 'parent' book object that the query has found
                // return _.find(authors, {id: parent.authorId}); // accessing the dummy data
                return Author.findById(parent.authorId);
            } 
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id:{type: GraphQLID}, // don't have to use string type. It's coerced by JS depending on the type of the returned data.
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: { // can find books associated with an author (many-to-one)
            type: new GraphQLList(BookType), // because an author can have more than one book
            // 'parent' is the author object that the query has found in authors
            resolve(parent, args) {
                // find all book records (in books collection) where the authorId matches the Id of the book object/record.
                // return _.filter(books, {authorId: parent.id}); // returns an array with just matching books
                return Book.find({authorId: parent.id});
            }
        }
    })
});

// How we 'jump into the graph'. When someone querys a book, use this schema to get it.
// When the query is received by the graphql server (and it's identified as a BookType query )
// the resolve function is called. Uses the book id in the query to search for the book in the 
// dummy data (normally a database)
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: { // entrypoint to the graph (case has to match)
            type: BookType,
            args: {id: {type: GraphQLID}}, // the book we want
            resolve(parent, args) {
                // code to get data from db / other source
                // Use lodash find() because it works with objects as well as arrays
                // return _.find(books, {id: args.id})
                return Book.findById(args.id);
            }
        },
        author: { // entrypoint to the graph (case has to match)
            type: AuthorType,
            args: {id: {type: GraphQLID}}, // the author we want
            resolve(parent, args) { 
                // The resolve function retrieves the data from the db. GraphQL then returns what the query asked for.
                // return _.find(authors, {id: args.id})
                return Author.findById(args.id);
            }
         },
         books: {
             type: new GraphQLList(BookType),
             resolve(parent, args) {
                //  return books
                return Book.find({}); // pass empty object to get all book records in Book collection
             }
         },
         authors: {
             type: new GraphQLList(AuthorType),
             resolve(parent, args) {
                //  return authors
                return Author.find({}); // pass empty object to get all author records in Author collection
             }
         }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }, // error thrown if ommitted from addAuthor query
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) { // use the provided arguments to make a new author instance and store it in the database
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                // Save the new author in the 'authors' collection in the db passed to mongoose.connect()
                // The whole author object (record) is returned. GraphQL will then return only the data specified in the query.
                return author.save(); 
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }, // error thrown if ommitted from addBook query
                genre: { type: new GraphQLNonNull(GraphQLString)  },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save()
            }
        }
    }
});

// Defines which query types the user can use when making queries from the frontend
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});