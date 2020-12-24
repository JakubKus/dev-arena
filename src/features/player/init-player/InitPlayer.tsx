import { useQuery } from '@apollo/client';
import { Loader } from 'components/loader/Loader';
import { authPlayer, authPlayerVariables } from 'features/player/gql-types/authPlayer';
import 'features/player/init-player/init-player.scss';
import { initPlayerQuery } from 'features/player/player-queries';
import { selectPlayer, updatePlayer } from 'features/player/playerSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ROUTE } from 'routes';

export const InitPlayer: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const email = useSelector(selectPlayer).email as string;
  const { data, loading } = useQuery<authPlayer, authPlayerVariables>(initPlayerQuery, { variables: { email } });

  useEffect(() => {
    data && dispatch(updatePlayer({ ...data.player, isInitialized: true }));
  }, [data, dispatch]);

  useEffect(() => {
    data && history.push(data.player?.chosenDevName ? ROUTE.home : ROUTE.initDeveloper);
  }, [data, history]);

  if (loading) return <Loader />;
  return (
    <div className="init-player">
      <p>Database connection error :( </p>
      <button className="init-player__button" onClick={() => history.push(ROUTE.home)}>try again</button>
    </div>
  );
};
