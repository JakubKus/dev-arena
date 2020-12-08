import { useAuth0 } from '@auth0/auth0-react';
import 'components/welcome/welcome.scss';
import { beginLogin, failLogin } from 'features/auth/authSlice';
import { IS_GUEST } from 'localstorage-keys';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ROUTE } from 'routes';

export const Welcome: React.FC = () => {
  const dispatch = useDispatch();
  const { loginWithRedirect } = useAuth0();
  const history = useHistory();

  const handleLogin = () => {
    dispatch(beginLogin());
    loginWithRedirect().catch((_) => {
      dispatch(failLogin());
    });
  };

  const handleBeginGuest = () => {
    localStorage.setItem(IS_GUEST, 'true');
    history.push(ROUTE.initDeveloper);
  };

  return (
    <div className="welcome">
      <button className="welcome__link" onClick={handleLogin}>Create/get your epic character</button>
      <button className="welcome__link" onClick={handleBeginGuest}>Just let me fight!!1!1</button>
    </div>
  );
};
