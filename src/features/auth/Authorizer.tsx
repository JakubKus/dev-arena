import { useAuth0 } from '@auth0/auth0-react';
import { failLogin, fulfillLogin, selectGuest, selectLoginFailed } from 'features/auth/authSlice';
import { selectPlayer, updatePlayer } from 'features/player/playerSlice';
import { TOKEN } from 'localstorage-keys';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ROUTE } from 'routes';

export const Authorizer: React.FC = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoginFail = useSelector(selectLoginFailed);
  const player = useSelector(selectPlayer);
  const isGuest = useSelector(selectGuest);

  useEffect(() => {
    if (user) {
      const nickname = user[`${process.env.REACT_APP_AUTH0_NAMESPACE}/username`];
      dispatch(updatePlayer({ email: user.email, nickname }));
    }
  }, [dispatch, user]);

  useEffect(() => {
    (async () => {
      try {
        localStorage[TOKEN] = await getAccessTokenSilently();
        dispatch(fulfillLogin());
      } catch (e) {
        dispatch(failLogin());
      }
    })();
  }, [dispatch, getAccessTokenSilently]);

  useEffect(() => {
    if (isGuest) history.push(ROUTE.initDeveloper);
    if (player.email) history.push(ROUTE.initPlayer);
    if (isLoginFail) history.push(ROUTE.welcome);
  }, [isGuest, history, player.email, isLoginFail]);

  return null;
};
