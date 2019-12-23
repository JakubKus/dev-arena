import React, { useContext } from 'react';
import { RouteContext } from '../../shared/reducers/route-reducer/route-reducer';
import route from '../../shared/models/routes';

export default () => {
  const { state, dispatch } = useContext(RouteContext);
  return <>
    <p>{state.activeRoute}</p>
    <button onClick={() => dispatch({ type: route.Battleground })}>bg</button>
    <button onClick={() => dispatch({ type: route.ChooseDeveloper })}>choose</button>
    <button onClick={() => dispatch({ type: route.Shop })}>shop</button>
  </>
}
