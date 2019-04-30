import * as React from 'react'
import { baseKey } from './module'
import { connect } from "react-redux"
// import { LazyState } from "./reducer"

// Need to force a re render
export const Lazy = (p: any, s: any) => {
    console.log(p)
    console.log(s)
    return <div>
        <h1>Lazy: {baseKey} </h1>
        <button onClick={() => p.doSomething()}>Do Something</button>
    </div>
}


const mapDispatch = (dispatch) => ({
    doSomething: () => dispatch({type: 'LAZY', payload: 'FOO'})
})

//
// const mapState = (state: LazyState) => {
//   console.log('STATE', state)
//   return {}
// }

export const ConnectedLazy = connect(null, mapDispatch)(Lazy)





