import * as React from 'react';
import { ConnectedStatic } from './components/static'
import { ModuleLoader, ModuleLoader2, ModuleLoader3 } from "./module"

export const App: React.FC = () => {
  // This is the only one that works client side
  // const LazyLoadComponent = ModuleLoader(() => import(/* webpackChunkName: "Lazy" */'./components/lazy/module'))

  // This renders client side and server side - but no dynamic imports
  const LazyLoadComponent = ModuleLoader2()

  // This doesn't work when trying to render
  // const LazyLoadComponent = ModuleLoader3('./components/lazy/module')

  return (
    <div>
      <ConnectedStatic />
      {/*<LazyLoadComponent />*/}
      <LazyLoadComponent />
    </div>
  )
}

