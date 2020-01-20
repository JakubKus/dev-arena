import React from 'react';
import ROUTE from '../../models/routes';
import { State, RouteAction } from './route-model'

export const routeReducer = (state: State, action: RouteAction): State => {
  switch (action.type) {
    case ROUTE.Arena: return { activeRoute: ROUTE.Arena};
    case ROUTE.ChangeNickname: return { activeRoute: ROUTE.ChangeNickname};
    case ROUTE.ChooseDeveloper: return { activeRoute: ROUTE.ChooseDeveloper };
    case ROUTE.Credits: return { activeRoute: ROUTE.Credits };
    case ROUTE.EnterNickname: return { activeRoute: ROUTE.EnterNickname };
    case ROUTE.HighScores: return { activeRoute: ROUTE.HighScores };
    case ROUTE.Home: return { activeRoute: ROUTE.Home };
    case ROUTE.Shop: return { activeRoute: ROUTE.Shop };
    default: return state;
  }
};

export const routeReducerInit: State = {
  activeRoute: ROUTE.EnterNickname
};

interface RouteContextModel {
  state: typeof routeReducerInit,
  dispatch: React.Dispatch<RouteAction>
}

export const RouteContext = React.createContext<RouteContextModel>({
  state: routeReducerInit, dispatch: () => null
});
