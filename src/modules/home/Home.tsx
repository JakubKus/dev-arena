import React, { FC, useContext } from 'react';
import { RouteContext } from '../../shared/reducers/route-reducer/route-reducer';
import ROUTE from '../../shared/models/routes';
import './home.scss';

export const Home: FC = () => {
  const { dispatch } = useContext(RouteContext);

  return (
    <nav>
      <input
        type='button'
        value='FIGHT!'
        onClick={() => dispatch({ type: ROUTE.Arena})}
      />
      <input
        type='button'
        value='SHOP'
        onClick={() => dispatch({ type: ROUTE.Shop})}
      />
      <input
        type='button'
        value='CHANGE DEVELOPER'
        onClick={() => dispatch({ type: ROUTE.ChooseDeveloper})}
      />
      <input
        type='button'
        value='HIGH SCORES'
        onClick={() => dispatch({ type: ROUTE.HighScores})}
      />
      <input
        type='button'
        value='CHANGE NICKNAME'
        onClick={() => dispatch({ type: ROUTE.ChangeNickname})}
      />
      <input
        type='button'
        value='CREDITS'
        onClick={() => dispatch({ type: ROUTE.Credits})}
      />
    </nav>
  );
};
