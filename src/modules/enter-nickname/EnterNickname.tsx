import React, { FC, useContext, useEffect, useState } from 'react';
import { RouteContext } from '../../shared/reducers/route-reducer/route-reducer';
import ROUTE from '../../shared/models/routes';
import './enterNickname.scss';

export const EnterNickname: FC = () => {
  const { state, dispatch } = useContext(RouteContext);
  const [nickname, enterNickname] = useState<string>('');

  const handleFormSubmit = (): void => {
    localStorage.setItem('nickname', nickname === '' ? 'Anonymous' : nickname);
    dispatch({ type: ROUTE.Home });
  };

  useEffect(() => {
    if (state.activeRoute === ROUTE.EnterNickname && shouldRedirect()) {
      dispatch({ type: ROUTE.Home });
    }

    if (state.activeRoute === ROUTE.ChangeNickname) {
      enterNickname(localStorage.getItem('nickname') || 'Anonymous');
    }
  }, []);

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Tell me, what's your nickname:
        <input
          type='text'
          value={nickname}
          onChange={e => enterNickname(e.target.value)}
          placeholder='Anonymous'
        />
      </label>
      <input type='submit' value='OK' />
    </form>
  );
};

const shouldRedirect = (): boolean => {
  return localStorage.getItem('nickname') != null;
};
