import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

const client = new ApolloClient({
  uri: 'http://192.168.187.143:4000', // your GraphQL server URL
  cache: new InMemoryCache()
});

const ApolloProviderComponent = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default ApolloProviderComponent;
