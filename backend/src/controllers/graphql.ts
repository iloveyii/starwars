// ----------------------------------
// Imoort packages
// ----------------------------------
import axios from "axios";
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLBoolean,
} from "graphql";

const getProducts = (arg: any) => {};

// ----------------------------------
// Get AttributeType
// ----------------------------------
const AttributeType = new GraphQLObjectType({
  name: "Attribute",
  description: "A single Attribute",
  fields: {
    name: { type: GraphQLString },
    value: { type: GraphQLString },
  },
});

// ----------------------------------
// Get ProductType
// ----------------------------------
const ProductType = new GraphQLObjectType({
  name: "Product",
  description: "A single Product",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    attributes: { type: new GraphQLList(AttributeType) },
  },
});

// ----------------------------------
// Root Query
// ----------------------------------
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    products: {
      type: new GraphQLList(ProductType),
      args: {
        id: { type: GraphQLInt },
        page: { type: GraphQLInt },
        page_size: { type: GraphQLInt },
      },
      resolve: async (root, args, context, info) => await getProducts(args),
    },
    success: {
      type: GraphQLBoolean,
      resolve: () => true,
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
