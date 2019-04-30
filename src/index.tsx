import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'
import { configureStore } from './store';
import { coreSaga } from "./sagas"
import Loadable from "react-loadable"
import { AnyAction } from "redux"

const store = configureStore({}, coreSaga)

export interface Module {
  component: any
  baseKey: string
  reducer: any
  sagas?: any[]
  actions?: AnyAction[]
}

function Loading() {
  return <div>Loading...</div>;
}

// Need to sort - ensure SSR works
export const ModuleLoader = (loader) => Loadable({
  loader,
  loading: () => <Loading/>,
  render: (mob: { default: Module }) => {
    const {sagas,component: Component, reducer, baseKey, actions} = mob.default
    // See if we have dModule - if so get the reducer and set it up
    // Could this be some bootstrap fn?
    // We could then run it and it fires all necessary sagas
    // creates state etc
    store.injectReducer(baseKey, reducer)
    sagas && sagas.map(saga => (store.runSaga(saga)))

    // Need to dispatch the actions
    actions && actions.map(action => store.dispatch(action))

    return <Component />
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
