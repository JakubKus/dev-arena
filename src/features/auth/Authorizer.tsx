import { useAuth0 } from '@auth0/auth0-react';
import { selectLoginFailed, fulfillLogin, failLogin } from 'features/auth/authSlice';
import { selectPlayer, updatePlayer } from 'features/player/playerSlice';
import { IS_GUEST, TOKEN } from 'localstorage-keys';
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

  useEffect(() => {
    user && dispatch(updatePlayer({ email: user.email, nickname: user.nickname }));
  }, [user, dispatch]);

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        localStorage.setItem(TOKEN, token);
        localStorage.removeItem(IS_GUEST);
        dispatch(fulfillLogin());
      } catch (e) {
        dispatch(failLogin());
      }
    })();
  }, [dispatch, getAccessTokenSilently]);

  useEffect(() => {
    if (localStorage[IS_GUEST]) history.push(ROUTE.initDeveloper);
    if (player.email) history.push(ROUTE.initPlayer);
    if (isLoginFail) history.push(ROUTE.welcome);
  }, [player.nickname, isLoginFail, history]);

  return null;
};
