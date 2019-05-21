import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

import { Provider } from 'react-redux'
import { store } from './module'

ReactDOM.hydrate(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

