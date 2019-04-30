import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { rootReducer } from './reducer'
import { Reducer } from 'react'

export let store: any

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

  store = createStore(
    createReducer(),
    intialState,
    enhancer
  );

  // This allows for dynamically adding a reducer when required
  store.asyncReducers = {}
  store.injectReducer = (key: string, asyncReducer: Reducer<any, any>) => {
    store.asyncReducers[key] = asyncReducer
    store.replaceReducer(createReducer(store.asyncReducers))
  }

  // Need to run the sagas to create watchers
  store.runSaga = (saga: any) => sagaMiddleware.run(saga, store)

  // Get the 'normal' sagas to run
  Object.keys(initialSagas).map((saga) => store.runSaga(initialSagas[saga]))

  return store
}

