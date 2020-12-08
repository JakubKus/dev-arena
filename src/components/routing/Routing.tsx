import { Credits } from 'components/credits/Credits';
import { Highscores } from 'components/highscores/Highscores';
import { Home } from 'components/home/Home';
import { Profile } from 'components/profile/Profile';
import { AuthGuard } from 'components/routing/route-guards/AuthGuard';
import { InitGuard } from 'components/routing/route-guards/InitGuard';
import { NotInitGuard } from 'components/routing/route-guards/NotInitGuard';
import { Shop } from 'components/shop/Shop';
import { Welcome } from 'components/welcome/Welcome';
import { Authorizer } from 'features/auth/Authorizer';
import { Arena } from 'components/arena/Arena';
import { InitDeveloper } from 'features/player/InitDeveloper';
import { InitPlayer } from 'features/player/InitPlayer';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ROUTE } from 'routes';

export const Routing: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={ROUTE.highscores}>
        <Highscores />
      </Route>
      <Route exact path={ROUTE.credits}>
        <Credits />
      </Route>
      <Route exact path={ROUTE.initDeveloper}>
        <InitDeveloper />
      </Route>
      <Route exact path={ROUTE.auth}>
        <NotInitGuard><Authorizer /></NotInitGuard>
      </Route>
      <Route exact path={ROUTE.welcome}>
        <NotInitGuard><Welcome /></NotInitGuard>
      </Route>
      <Route exact path={ROUTE.home}>
        <InitGuard><Home /></InitGuard>
      </Route>
      <Route exact path={ROUTE.battle}>
        <InitGuard><Arena /></InitGuard>
      </Route>
      <Route exact path={ROUTE.initPlayer}>
        <AuthGuard><InitPlayer /></AuthGuard>
      </Route>
      <Route exact path={ROUTE.shop}>
        <AuthGuard><Shop /></AuthGuard>
      </Route>
      <Route exact path={ROUTE.profile}>
        <AuthGuard><Profile /></AuthGuard>
      </Route>
    </Switch>
  </BrowserRouter>
);
