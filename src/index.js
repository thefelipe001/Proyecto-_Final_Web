import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './Reducers';
import * as serviceWorker from './serviceWorker';

/**
 * Index page providing the redux store as well.
 */
const furnitureStore = createStore( allReducers );

ReactDOM.render(<Provider store={furnitureStore}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
