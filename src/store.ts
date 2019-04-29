import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { rootReducer } from './reducer'
import { takeLatest } from '@redux-saga/core/effects';
import { Reducer } from 'react'

export let store: any


const doSomething = () => {
  console.log('SOME_ACTION called and invoked from Saga')
}

// Currently sagas aren't being used - but they need to be
// and we need to make them listened to
function* mySaga() {
  yield takeLatest('SOME_ACTION', doSomething);
}

function createReducer(asyncReducers: Reducer<any, any> = (s) => s) {
  return combineReducers({
    ...rootReducer,
    ...asyncReducers
  })
}

export const configureStore = (intialState = {}) => {
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

  sagaMiddleware.run(mySaga)

  // Add a dictionary to keep track of the registered async reducers
  store.asyncReducers = {}

  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
  store.injectReducer = (key: string, asyncReducer: Reducer<any, any>) => {
    let useKey = key

    if (key === 'ORIGINAL_KEY') {
      useKey = 'NEW_VALUE'
    }

    store.asyncReducers[useKey] = asyncReducer
    store.replaceReducer(createReducer(store.asyncReducers))

    return useKey
  }

  return store
}

