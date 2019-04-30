import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'
import { configureStore } from './store';
import { coreSaga } from "./sagas"
import Loadable from "react-loadable"
import { AnyAction, Reducer, Store } from "redux"

const store = configureStore({}, coreSaga)

export interface Module {
  init(storeConnector: DynamicStoreInterface): React.ComponentType
}

function Loading() {
  // This could be any loader
  return <div>Loading...</div>
}

export interface DynamicStoreInterface {
  injectSagas(key: string, sagas: any): void
  injectActions(actions: AnyAction[]): void
  injectReducer(key: string, reducer: Reducer<any, any>): void
}

export interface DynamicStore {
  asyncReducers: any
  asyncSagas: any
  injectSagas(key: string, sagas: any): void
  injectActions(actions: AnyAction[]): void
  injectReducer(key: string, reducer: Reducer<any, any>): void
}

export type CustomStore = Store & DynamicStore & {
  runSaga(saga: any): void

}

const storeConnector = (store: CustomStore): DynamicStoreInterface => ({
  injectSagas: store.injectSagas,
  injectActions: store.injectActions,
  injectReducer: store.injectReducer
})

const connector = storeConnector(store)

export const ModuleLoader = (loader) => Loadable({
  loader,
  loading: () => <Loading/>,
  render: ({default: {init}}: { default: Module }) => {
    const Component = init(connector)

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
