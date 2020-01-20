import React, { Reducer, useEffect, useReducer, useState } from 'react';
import ROUTE from '../../shared/models/routes'
import { ChooseDeveloper } from '../choose-developer/ChooseDeveloper';
import { Arena } from '../arena/Arena';
import { Shop } from '../shop/Shop'
import {
  routeReducer, routeReducerInit, RouteContext
} from '../../shared/reducers/route-reducer/route-reducer';
import { EnterNickname } from '../enter-nickname/EnterNickname';
import { Home } from '../home/Home';
import { Credits } from '../credits/Credits';
import { HighScores } from '../highScores/HighScores';

export const Game = () => {
  const [state, dispatch] = useReducer<Reducer<any, any>>(routeReducer, routeReducerInit);
  const [activeRoute, setActiveRoute] = useState<any>(<ChooseDeveloper />);
  useEffect(() => {
    switch (state.activeRoute) {
      case ROUTE.Arena: return setActiveRoute(<Arena />);
      case ROUTE.ChangeNickname:
      case ROUTE.EnterNickname: return setActiveRoute(<EnterNickname />);
      case ROUTE.ChooseDeveloper: return setActiveRoute(<ChooseDeveloper />);
      case ROUTE.Credits: return setActiveRoute(<Credits />);
      case ROUTE.HighScores: return setActiveRoute(<HighScores />);
      case ROUTE.Home: return setActiveRoute(<Home />);
      case ROUTE.Shop: return setActiveRoute(<Shop />);
      default: return setActiveRoute(<ChooseDeveloper />);
    }
  }, [state.activeRoute]);

  return (
    <RouteContext.Provider value={{ state, dispatch }}>
      {activeRoute}
    </RouteContext.Provider>
  );
};
