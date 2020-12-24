import { useAuth0 } from '@auth0/auth0-react';
import { AvailableLink } from 'components/home/available-link/AvailableLink';
import 'components/home/home.scss';
import { logOut, selectGuest } from 'features/auth/authSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTE } from 'routes';

export const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { logout } = useAuth0();
  const isGuest = useSelector(selectGuest);
  const authButton = isGuest ? 'Create account' : 'Logout';

  const handleAuth = () => {
    dispatch(logOut());
    logout();
  };

  return (
    <nav className="home">
      <Link className="home__link" to={ROUTE.battle}>Go fight!</Link>
      <Link className="home__link" to={ROUTE.highscores}>Highscores</Link>
      <AvailableLink text="Profile" path={ROUTE.profile} />
      <AvailableLink text="Shop" path={ROUTE.shop} />
      <Link className="home__link" to={ROUTE.credits}>Credits</Link>
      <button className="home__link" onClick={handleAuth}>{authButton}</button>
    </nav>
  );
};
