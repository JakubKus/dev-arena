import ROUTE from '../../models/routes';

export type State = {
  activeRoute: ROUTE,
};

export type RouteAction = {
  type: ROUTE,
};
