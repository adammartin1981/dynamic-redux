
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

export const ModuleLoader = (loader) => Loadable({
  loader,
  loading: () => <Loading/>,
  render: ({default: {init}}: { default: Module }) => {
    const Component = init(connector)

    return <Component />
  }
});

export const ModuleLoader2 = (moduleName, modulePath) => {
  // const localLoader = () => import(/* webpackChunkName: "[request]" */ modulePath+`${moduleName}`)
  const localLoader = () => import(modulePath)
  return Loadable({
    loader: localLoader,
    loading: () => <Loading />,
    modules: [moduleName],
    render: ({default: {init}}: { default: Module }) => {
      const Component = init(connector)

      return <Component />
    }
  })
}

export const ModuleLoader3 = (modulePath) => Loadable({
  loader: () => import(modulePath),
  loading: () => <Loading />,
  render: ({default: {init}}: { default: Module }) => {
    const Component = init(connector)

    return <Component />
  }
})

