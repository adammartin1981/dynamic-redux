import { ConnectedLazy } from './lazy'
import { reducer } from './reducer'
import { sagas as lazySaga } from "./saga"
import { DynamicStore, Module } from "../../index"

export const baseKey = 'lazy'

const sagas = [
  lazySaga
]

const actions = [
  // This is the initial action that is fired off on load
  { type: 'INIT', payload: 'boo' }
]

// Cannot use the reserved word module
const mobule: Module = {
  init: (storeConnector: DynamicStore) => {
    console.log('STORE CONN', storeConnector)

    // This uses the modified store to allow us to add a reducer
    reducer && storeConnector.injectReducer(baseKey, reducer)

    // We can now execute our sagas
    sagas && storeConnector.injectSagas(baseKey, sagas)

    // And execute any initial actions that are required
    actions && storeConnector.injectActions(actions)

    // Give back the entry component
    // Should we have other components here too?
    return ConnectedLazy
  }
}

export default mobule