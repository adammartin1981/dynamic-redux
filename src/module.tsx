
import Loadable from "react-loadable"
import * as React from "react"
import { configureStore } from "./store"
import { coreSaga } from "./sagas"
import { AnyAction, Reducer, Store } from "redux"

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

export const store = configureStore({}, coreSaga)

function Loading() {
  // This could be any loader
  return <div>Loading...</div>
}

export interface Module {
  init(storeConnector: DynamicStoreInterface): React.ComponentType
}

const storeConnector = (store: CustomStore): DynamicStoreInterface => ({
  injectSagas: store.injectSagas,
  injectActions: store.injectActions,
  injectReducer: store.injectReducer
})

const connector = storeConnector(store)

// This one doesn't work with the plugin, but does client side.
export const ModuleLoader = (loader) => Loadable({
  loader,
  loading: () => <Loading/>,
  render: ({default: {init}}: { default: Module }) => {
    const Component = init(connector)

    return <Component />
  }
});

// This one works with the plugin and client side too
export const ModuleLoader2 = () => {
  return Loadable({
    loader: () => import('./components/lazy/module'),
    loading: () => <Loading />,
    render: ({default: {init}}: { default: Module }) => {
      console.log('TRYING TO RENDER')
      const Component = init(connector)

      return <Component />
    }
  })
}

// This one works with the plugin but not client side
export const ModuleLoader3 = (modulePath) => Loadable({
  loader: () => import(modulePath),
  loading: () => <Loading />,
  render: ({default: {init}}: { default: Module }) => {
    console.log('TRYING TO RENDER')
    const Component = init(connector)
    console.log('GOT COMPONENT')
    return <Component />
  }
})

