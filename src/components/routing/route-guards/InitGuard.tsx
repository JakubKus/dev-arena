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

  if (player.isInitialized) return <>{children}</>; // 2, 3, 5
  if (isLoading) return <Loader />;
  return <Redirect to={ROUTE.auth} />; // 1, 4, 6
};
/* #1 not logged, 1st time           // welcome
 * #2 not logged, guest refresh      // pass
 * #3 not logged, guest              // pass
 * #4 logged, initialized refresh    // loading -> welcome -> pass
 * #5 logged, initialized            // pass
 * #6 logged not initialized refresh // loading welcome -> createAcc
 */
