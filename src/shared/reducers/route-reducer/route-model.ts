import route from '../../models/routes';

export type State = {
  activeRoute: route,
};

export type RouteAction = {
  type: route,
};