const { ApolloServer, gql } = require('apollo-server');

// Type definitions
const typeDefs = gql`
  type Item {
    id: ID!
    name: String!
    description: String!
  }

  type Query {
    items: [Item]
    item(id: ID!): Item
  }

  type Mutation {
    addItem(name: String!, description: String!): Item
    updateItem(id: ID!, name: String, description: String): Item
    deleteItem(id: ID!): Item
  }
`;

// Sample data
let items = [
  { id: '1', name: 'Item 1', description: 'This is item 1' },
  { id: '2', name: 'Item 2', description: 'This is item 2' },
];

// Resolvers
const resolvers = {
  Query: {
    items: () => items,
    item: (_, { id }) => items.find(item => item.id === id),
  },
  Mutation: {
    addItem: (_, { name, description }) => {
      const newItem = { id: `${items.length + 1}`, name, description };
      console.log('newItem',newItem)
      items.push(newItem);

      return newItem;
    },
    updateItem: (_, { id, name, description }) => {
      const item = items.find(item => item.id === id);
      if (item) {
        if (name) item.name = name;
        if (description) item.description = description;
        return item;
      }
      return null;
    },
    deleteItem: (_, { id }) => {
      const itemIndex = items.findIndex(item => item.id === id);
      if (itemIndex > -1) {
        const [deletedItem] = items.splice(itemIndex, 1); 
        
        return deletedItem;
      }
      return null;
    },
  },
};

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
