import * as React from 'react'
import { connect } from "react-redux"

const Static = (props) => {
  console.log('RP', props)
  return <div>
    <h1>Static</h1>
    <button onClick={() => props.doSomething()}>Do something</button>
  </div>
}

const mapDispatch = (dispatch) => ({
  doSomething: () => dispatch({type: 'STATIC', payload: 'FOO'})
})

export const ConnectedStatic = connect(null, mapDispatch)(Static)