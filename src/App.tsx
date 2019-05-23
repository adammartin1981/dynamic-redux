import * as React from 'react';
import { ConnectedStatic } from './components/static'
import { ModuleLoader, ModuleLoader2, ModuleLoader3 } from "./module"

export const App: React.FC = () => {
  // const LazyLoadComponent = ModuleLoader(() => import(/* webpackChunkName: "Lazy" */'./components/lazy/module'))
  const LazyLoadComponent = ModuleLoader2()
  // const LazyLoadComponent = ModuleLoader3('./components/lazy/module')

  return (
    <div>
      <ConnectedStatic />
      {/*<LazyLoadComponent />*/}
      <LazyLoadComponent />
    </div>
  )
}

