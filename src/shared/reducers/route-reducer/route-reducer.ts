import React from 'react';
import route from '../../models/routes';
import { State, RouteAction } from './route-model'

export const routeReducer = (state: State, action: RouteAction) => {
  switch (action.type) {
    case route.ChooseDeveloper: return { activeRoute: route.ChooseDeveloper };
    case route.Battleground: return { activeRoute: route.Battleground};
    case route.Shop: return { activeRoute: route.Shop };
    default: return state;
  }
};

export const routeReducerInit: State = {
  activeRoute: route.Battleground
};

interface RouteContextModel {
  state: typeof routeReducerInit,
  dispatch: React.Dispatch<RouteAction>
}

export const RouteContext = React.createContext<RouteContextModel>({
  state: routeReducerInit, dispatch: () => {}
});
