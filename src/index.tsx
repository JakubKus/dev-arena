import { ApolloProvider } from '@apollo/client';
import { apolloClient } from 'components/apollo-client/apolloClient';
import { Auth0Wrapper } from 'components/auth0-wrapper/auth0-wrapper';
import { Routing } from 'components/routing/Routing';
import 'index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Wrapper>
        <ApolloProvider client={apolloClient}>
          <Routing />
        </ApolloProvider>
      </Auth0Wrapper>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
