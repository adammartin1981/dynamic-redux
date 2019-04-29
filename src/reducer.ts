// import { combineReducers } from 'redux';
import { reducer as staticReducer } from './components/static';

// Need to look at this - this was combineReducers
export const rootReducer = {
  static: staticReducer
};
