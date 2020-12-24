import { useAuth0 } from '@auth0/auth0-react';
import { Loader } from 'components/loader/Loader';
import { selectPlayer } from 'features/player/playerSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ROUTE } from 'routes';

export const InitGuard: React.FC = ({ children }) => {
  const player = useSelector(selectPlayer);
  const { isLoading } = useAuth0();

  if (player.isInitialized) return <>{children}</>;
  if (isLoading) return <Loader />;
  return <Redirect to={ROUTE.auth} />;
};
