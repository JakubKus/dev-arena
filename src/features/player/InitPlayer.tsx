import { useQuery } from '@apollo/client';
import { Loader } from 'components/loader/Loader';
import { authPlayer, authPlayerVariables } from 'features/player/gql-types/authPlayer';
import { initPlayerQuery } from 'features/player/player-queries';
import { selectPlayer, updatePlayer } from 'features/player/playerSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ROUTE } from 'routes';

export const InitPlayer: React.FC = () => {
  const player = useSelector(selectPlayer);
  const dispatch = useDispatch();
  const history = useHistory();
  const { data, loading } = useQuery<authPlayer, authPlayerVariables>(initPlayerQuery,
    { variables: { email: player.email as string } });

  useEffect(() => {
    data && dispatch(updatePlayer({ ...data.player, isInitialized: true })); // todo: check if dispatches
  }, [data, dispatch]);

  useEffect(() => {
    data && history.push(data.player?.chosenDevName ? ROUTE.home : ROUTE.initDeveloper);
  }, [data, history]);

  if (loading) return <Loader />;
  return <><p>Database connection error :( </p>
    <button onClick={() => history.push(ROUTE.home)}>try again</button>
  </>;
};
