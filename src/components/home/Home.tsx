import { useAuth0 } from '@auth0/auth0-react';
import 'components/home/home.scss';
import { IS_GUEST } from 'localstorage-keys';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE } from 'routes';

export const Home: React.FC = () => {
  const { logout } = useAuth0();
  const handleAuth = () => {
    localStorage.removeItem(IS_GUEST);
    logout();
  };
  const authButton = localStorage[IS_GUEST] ? 'Create account' : 'Logout';

  return (
    <nav className="home">
      <Link className="home__link" to={ROUTE.battle}>Go fight!</Link>
      <Link className="home__link" to={ROUTE.highscores}>Highscores</Link>
      <Link className="home__link" to={ROUTE.profile}>Profile</Link>
      <Link className="home__link" to={ROUTE.shop}>Shop</Link>
      <Link className="home__link" to={ROUTE.credits}>Credits</Link>
      <button className="home__link" onClick={handleAuth}>{authButton}</button>
    </nav>
  );
};
