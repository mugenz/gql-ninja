const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
} = graphql;

const Book = require("../models/book");
const Author = require("../models/author");

// dummy data
// var books = [
//   { name: "Name of the Wind", genre: "Fantasy", id: "1", authId: "1" },
//   { name: "The Final Empire", genre: "Fantasy", id: "2", authId: "1" },
//   { name: "The Long Earth", genre: "Sci-Fi", id: "3", authId: "2" },
//   { name: "Hero of the ages", genre: "Fantasy", id: "1", authId: "1" },
//   { name: "Colour of magic", genre: "Fantasy", id: "2", authId: "2" },
//   { name: "Light Fantastic", genre: "Sci-Fi", id: "3", authId: "3" },
// ];

// var authors = [
//   { name: "Fivos Vogiatzis", age: 49, id: "1" },
//   { name: "Dimitra Liveri", age: 23, id: "2" },
//   { name: "Manos Markou", age: 67, id: "3" },
// ];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log("parent :>> ", parent);
        // return _.find(authors, { id: parent.authId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        console.log("parent :>> ", parent);
        // return _.filter(books, { authId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        console.log(typeof args.id);
        // return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        console.log(typeof args.id);
        // return _.find(authors, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let author = new Author({ name: args.name, age: args.age });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authId: args.authId,
        });
        return book.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
