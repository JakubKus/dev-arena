import { useMutation, useQuery } from '@apollo/client';
import { Loader } from 'components/loader/Loader';
import { selectAuth } from 'features/auth/authSlice';
import { addPlayer, addPlayerVariables } from 'features/player/gql-types/addPlayer';
import { defaultDeveloper } from 'features/player/gql-types/defaultDeveloper';
import { addPlayerQuery, defaultDevQuery } from 'features/player/player-queries';
import { selectPlayer, updatePlayer, clearPlayer } from 'features/player/playerSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ROUTE } from 'routes';

export const InitDeveloper: React.FC = () => {
  const player = useSelector(selectPlayer);
  const isAuth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const history = useHistory();
  const { data, loading, error } = useQuery<defaultDeveloper>(defaultDevQuery);
  const [addPlayer] = useMutation<addPlayer, addPlayerVariables>(addPlayerQuery);

  useEffect(() => {
    if (player.nickname && player.email && data?.defaultDeveloper) {
      const initPlayer = {
        nickname: player.nickname,
        email: player.email,
        cash: 80,
        chosenDevName: data.defaultDeveloper.name,
        boughtIds: [data.defaultDeveloper.id]
      };

      const handleAddPlayer = async () => {
        await addPlayer({ variables: initPlayer });
        history.push(ROUTE.home);
      };

      dispatch(updatePlayer({ ...initPlayer, isInitialized: true }));
      if (isAuth) handleAddPlayer().catch((_) => dispatch(clearPlayer()));
      else history.push(ROUTE.home);
    } else if (data?.defaultDeveloper) {
      dispatch(updatePlayer({ chosenDevName: data.defaultDeveloper.name, isInitialized: true }));
      history.push(ROUTE.home);
    }
  }, [data, dispatch]);

  if (loading) return <Loader />;
  if (error) return <p>Init dev error :(</p>;
  return null;
};
