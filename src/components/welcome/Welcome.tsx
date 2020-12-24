import { useAuth0 } from '@auth0/auth0-react';
import 'components/welcome/welcome.scss';
import { beginGuest, beginLogin, failLogin } from 'features/auth/authSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ROUTE } from 'routes';

export const Welcome: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loginWithRedirect } = useAuth0();

  const handleSignup = () => {
    dispatch(beginLogin());
    loginWithRedirect({ screen_hint: 'signup' }).catch((_) => {
      dispatch(failLogin());
    });
  };

  const handleLogin = () => {
    dispatch(beginLogin());
    loginWithRedirect().catch((_) => {
      dispatch(failLogin());
    });
  };

  const handleBeginGuest = () => {
    dispatch(beginGuest());
    history.push(ROUTE.initDeveloper);
  };

  return (
    <div className="welcome">
      <button className="welcome__link" onClick={handleSignup}>Create a dev to compete with others</button>
      <button className="welcome__link" onClick={handleLogin}>Give me my legendary dev!</button>
      <button className="welcome__link" onClick={handleBeginGuest}>Just let me fight!!1!1</button>
    </div>
  );
};
