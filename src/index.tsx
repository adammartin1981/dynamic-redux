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

// Rough concept of a module
export interface Module {
  component: any
  baseKey: string
  reducer?: any
  sagas?: any[]
  actions?: AnyAction[]
}

function Loading() {
  // This could be any loader
  return <div>Loading...</div>
}

export const ModuleLoader = (loader) => Loadable({
  loader,
  loading: () => <Loading/>,
  render: ({default: {sagas,component: Component, reducer, baseKey, actions}}: { default: Module }) => {
    // This uses the modified store to allow us to add a reducer
    reducer && store.injectReducer(baseKey, reducer)

    // We can now execute our sagas
    sagas && sagas.map(saga => (store.runSaga(saga)))

    // And execute any initial actions that are required
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
