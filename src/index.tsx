import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'
import { configureStore } from './store';
import { coreSaga } from "./sagas"
import Loadable from "react-loadable"

const store = configureStore()

export interface Module {
  component: any
  baseKey: string
  reducer: any
  sagas?: any[]
}

Object.keys(coreSaga).map((saga) => store.runSaga(coreSaga[saga]))

function Loading() {
  return <div>Loading...</div>;
}

// Need to sort - ensure SSR works
// export const LoadableLazy = ({ foo }: {foo: s}) => Loadable({
export const LoadableLazy = (loader) => Loadable({
  loader,
  loading: (x) => {
    console.log('LOADING', x)
    return <Loading/>
  }, // Use spinner
  render: ({default: {component: Component, reducer, baseKey, sagas}}) => {
    // See if we have dModule - if so get the reducer and set it up
    // Could this be some bootstrap fn?
    // We could then run it and it fires all necessary sagas
    // creates state etc
    store.injectReducer(baseKey, reducer)
    sagas && sagas.map(saga => (store.runSaga(saga)))

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
