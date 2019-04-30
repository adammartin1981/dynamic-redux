import { ConnectedLazy } from './lazy'
import { reducer } from './reducer'
import { sagas as lazySaga } from "./saga"
import { Module } from "../../index"

export const baseKey = 'lazy'

// Cannot use the reserved word module
// export const module: Module = {
const m: Module = {
  component: ConnectedLazy,
  reducer,
  baseKey,
  sagas: [
    lazySaga
  ],
  actions: [
    { type: 'INIT', payload: 'boo' }
  ]
}

export default m