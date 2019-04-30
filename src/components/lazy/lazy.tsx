import * as React from 'react'
import { baseKey } from './module'
import { connect } from "react-redux"
import { LazyState } from "./reducer"

export const Lazy = (p: any) =>
  <div>
    <h1>Lazy: {baseKey} : { p.lazy }</h1>
    <button onClick={() => p.doSomething()}>Do Something</button>
  </div>


const mapDispatch = (dispatch) => ({
    doSomething: () => dispatch({type: 'LAZY', payload: 'FOO'})
})

interface RootLazyState {
  [baseKey]: LazyState
}

const root = (state: RootLazyState): LazyState => state[baseKey]

const mapState = (state) => {
  return { lazy: root(state).lazy }
}

export const ConnectedLazy = connect(mapState, mapDispatch)(Lazy)
