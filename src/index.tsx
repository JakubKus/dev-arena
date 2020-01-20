import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Game } from './modules/game/Game';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Game />, document.getElementById('root'));

serviceWorker.unregister();
