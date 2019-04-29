import * as React from 'react';
import { Static } from './components/static'

import Loadable from 'react-loadable';
// This is nasty....
// Look at dispatching an action with the module
// Then consume that in a single saga (with access to the store...)
// That can then fire off the necessary actions
import { store } from './store'

function Loading() {
  return <div>Loading...</div>;
}

export interface Module {
  component: any
  baseKey: string
  reducer: any
  changeKey: (a: string) => void
}

// Need to sort - ensure SSR works
export const LoadableLazy = Loadable({
  loader: () => import('./components/lazy/module'),
  loading: Loading,
  render: ({default: {component, reducer, changeKey, baseKey}}) => {
    // See if we have dModule - if so get the reducer and set it up
    // Could this be some bootstrap fn?
    // We could then run it and it fires all necessary sagas
    // creates state etc
    const newKey = store.injectReducer(baseKey, reducer)

    console.log('NEW KEY IS NOW', newKey)

    // Good/Bad/Very very ugly
    if(newKey !== baseKey) baseKey = newKey

    // Component could be an object/store of components
    // Could have an entry component
    return component()
  }
});

export const App: React.FC = () => {
  return (
    <div>
      <Static/>
      <LoadableLazy />
    </div>
  )
}

