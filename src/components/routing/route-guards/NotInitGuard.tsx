import { selectPlayer } from 'features/player/playerSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ROUTE } from 'routes';

export const NotInitGuard: React.FC = ({ children }) => {
  const player = useSelector(selectPlayer);
  return !player.isInitialized ? <>{children}</> : <Redirect to={ROUTE.home} />;
};
