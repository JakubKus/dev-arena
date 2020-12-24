import { Auth0Provider } from '@auth0/auth0-react';
import React, { FC } from 'react';

export const Auth0Wrapper: FC = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN ?? '';
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID ?? '';
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
  const issuer = process.env.REACT_APP_AUTH0_ISSUER;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      audience={audience}
      issuer={issuer}
      redirectUri={window.location.origin}
    >
      {children}
    </Auth0Provider>
  );
};
