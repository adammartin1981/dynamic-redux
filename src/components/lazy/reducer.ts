import { Action } from 'redux'

interface ActionWithPayload<T> extends Action {
  payload: T
}

interface ApplicationState {
}

const initialState = {
  lazy: 42
}

export const reducer = (state: ApplicationState = initialState, action: ActionWithPayload<any>) => {
  switch (action.type) {
    case 'SOME_ACTION':
      return {
        result: action.payload
      }
    default:
      return state
  }
}