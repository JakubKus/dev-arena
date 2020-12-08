import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { TOKEN } from 'localstorage-keys';

const httpLink = createHttpLink({
  uri: 'https://devarena-api.herokuapp.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage[TOKEN];
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
