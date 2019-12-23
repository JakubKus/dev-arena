import React, { useEffect, useReducer, useState } from 'react';
import route from '../../shared/models/routes'
import ChooseDeveloper from '../choose-developer';
import Battleground from '../battleground';
import Shop from '../shop';
import {
  routeReducer,
  routeReducerInit,
  RouteContext
} from '../../shared/reducers/route-reducer/route-reducer';

export default () => {
  const [state, dispatch] = useReducer(routeReducer, routeReducerInit);
  const [activeRoute, setActiveRoute] = useState(<ChooseDeveloper />);
  useEffect(() => {
    switch (state.activeRoute) {
      case route.ChooseDeveloper: return setActiveRoute(<ChooseDeveloper />);
      case route.Battleground: return setActiveRoute(<Battleground />);
      case route.Shop: return setActiveRoute(<Shop />);
      default: return setActiveRoute(<ChooseDeveloper />);
    }
  }, [state.activeRoute]);

  return <RouteContext.Provider value={{ state, dispatch }}>
    { activeRoute }
  </RouteContext.Provider>;
}
