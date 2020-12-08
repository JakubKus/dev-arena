import { useAuth0 } from '@auth0/auth0-react';
import { Loader } from 'components/loader/Loader';
import { selectAuth } from 'features/auth/authSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ROUTE } from 'routes';

export const AuthGuard: React.FC = ({ children }) => {
  const isAuth = useSelector(selectAuth);
  const { isLoading } = useAuth0();

  if (isAuth) return <>{children}</>;
  if (isLoading) return <Loader />;
  return <Redirect to={ROUTE.welcome} />;
};
