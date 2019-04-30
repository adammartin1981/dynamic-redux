import { AnyAction, applyMiddleware, combineReducers, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { rootReducer } from './reducer'
import { Reducer } from 'react'
import { CustomStore, DynamicStore } from "./index"


function createReducer(asyncReducers: Reducer<any, any> = (s) => s) {
  return combineReducers({
    ...rootReducer,
    ...asyncReducers
  })
}

export const configureStore = (intialState = {}, initialSagas = {}) => {
  const sagaMiddleware = createSagaMiddleware()

  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware),
  );

  const store: any = createStore(
    createReducer(),
    intialState,
    enhancer
  );

  // Need to run the sagas to create watchers
  store.runSaga = (saga: any) => sagaMiddleware.run(saga, store)

  // Got to be a neater way to do this
  const dynamicStore = makeStoreDynamic(store)

  // Get the 'normal' sagas to run
  Object.keys(initialSagas).map((saga) => dynamicStore.runSaga(initialSagas[saga]))

  return dynamicStore
}

const makeStoreDynamic = (store: CustomStore) => {
  const newStore: DynamicStore & CustomStore = {
    ...store,
    asyncReducers: {},
    asyncSagas: {},
    injectReducer: (key: string, asyncReducer: Reducer<any, any>) => {
      if (newStore.asyncReducers[key]) return
      newStore.asyncReducers[key] = asyncReducer
      newStore.replaceReducer(createReducer(newStore.asyncReducers))
    },
    injectSagas: (key: string, asyncSagas: any) => {
      if (newStore.asyncSagas[key]) return
      newStore.asyncSagas[key] = true
      asyncSagas.map(newStore.runSaga)
    },
    injectActions: (actions: AnyAction[]) =>
      actions.map(action => store.dispatch(action))
  }

  return newStore
}