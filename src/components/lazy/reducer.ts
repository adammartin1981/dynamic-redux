import { Action } from 'redux'

interface ActionWithPayload<T> extends Action {
  payload: T
}

export interface LazyState {
  lazy: number
  init: number
}

const initialState = {
  lazy: 42,
  init: 0
}

export const reducer = (state: LazyState = initialState, action: ActionWithPayload<any>) => {
  switch (action.type) {
    case 'LAZY':
      return {
        ...state,
        lazy: state.lazy + 1
      }

    case 'INIT':
      return {
        ...state,
        init: state.init + 1
      }
    default:
      return state
  }
}