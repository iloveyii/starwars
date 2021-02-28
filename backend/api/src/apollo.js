const { ApolloServer, gql } = require('apollo-server');
const { getFilms } = require('./services/serviceHandler');

export const typeDefs = gql`
  type Film {
    title: String
    release_date: String
  }

  type Query {
    films: [Film]
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
  },
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
