import { ConnectedLazy } from './lazy'
import { reducer } from './reducer'
import { sagas as lazySaga } from "./saga"
import { Module } from "../../index"

export const baseKey = 'lazy'

// Cannot use the reserved word module
// export const module: Module = {

// This will be how we expose out components/actions etc
// We might have to look at a way of providing an init fn
// that whoever consumes it executes
// We might also need to look at the way we bring in actions
// to 'dispatch' across module boundaries - however
// I don't feel that's the right way of doing it and any
// x-boundary module communication should be handled
// by bringing in either the entire module - or part of it
// (if that route is considered - or splitting out the module further)
const mobule: Module = {
  component: ConnectedLazy,
  reducer,
  baseKey,
  sagas: [
    lazySaga
  ],
  actions: [
    // This is the initial action that is fired off on load
    { type: 'INIT', payload: 'boo' }
  ]
}

export default mobule