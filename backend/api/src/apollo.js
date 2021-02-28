const { ApolloServer, gql } = require('apollo-server');
const { getFilms } = require('./services/serviceHandler');

const libraries = [
  {
    branch: 'downtown',
  },
  {
    branch: 'riverside',
  },
];

// The branch field of a book indicates which library has it in stock
const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
    branch: 'riverside',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
    branch: 'downtown',
  },
];

export const typeDefs = gql`
  type Film {
    title: String
    release_date: String
  }

  # A library has a branch and books
  type Library {
    branch: String!
    books: [Book!]
  }

  # A book has a title and author
  type Book {
    title: String!
    author: Author!
  }

  # An author has a name
  type Author {
    name: String!
  }

  # Queries can fetch a list of libraries
  type Query {
    films: [Film]
    libraries: [Library]
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves films from the "films" array above.
export const resolvers = {
  Query: {
    films: async () => {
      const data = await getFilms();
      return data.results;
    },
    libraries() {
      // Return our hardcoded array of libraries
      return libraries;
    },
  },
  Library: {
    books(parent) {
      // Filter the hardcoded array of books to only include
      // books that are located at the correct branch
      return books.filter(book => book.branch === parent.branch);
    },
  },
  Book: {
    // The parent resolver (Library.books) returns an object with the
    // author's name in the "author" field. Return a JSON object containing
    // the name, because this field expects an object.
    author(parent) {
      return {
        name: parent.author,
      };
    },
  },

  // Because Book.author returns an object with a "name" field,
  // Apollo Server's default resolver for Author.name will work.
  // We don't need to define one.
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

/**
 
curl \
-X POST \
-H "Content-Type: application/json" \
--data '{ "query": "{ films { title release_date } } " }' \
http://localhost:4000/
 */
