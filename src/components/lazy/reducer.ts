import { Action } from 'redux'

interface ActionWithPayload<T> extends Action {
  payload: T
}

export interface LazyState {
  lazy: number
}

const initialState = {
  lazy: 42
}

export const reducer = (state: LazyState = initialState, action: ActionWithPayload<any>) => {
  switch (action.type) {
    case 'LAZY':
      return {
        ...state,
        lazy: state.lazy + 1
      }
    default:
      return state
  }
}