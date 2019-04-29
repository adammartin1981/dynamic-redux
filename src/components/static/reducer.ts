import { Action } from 'redux'

interface ActionWithPayload<T> extends Action {
  payload: T
}

interface ApplicationState {
}

const initialState = {
  static: 'Value'
}


export const reducer = (state: ApplicationState = initialState, action: ActionWithPayload<any>) => {
  switch (action.type) {
    default:
      return state
  }
}