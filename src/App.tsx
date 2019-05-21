import * as React from 'react';
import { ConnectedStatic } from './components/static'
import { ModuleLoader, ModuleLoader2, ModuleLoader3 } from "./module"

export const App: React.FC = () => {
  const name = 'testing'
  // const LazyLoadComponent = ModuleLoader2('Lazy', './components/lazy/module')
  // const LazyLoadComponent = ModuleLoader(() => import(/* webpackChunkName: "Lazy" */'./components/lazy/module'))
  // const LazyLoadComponent2 = ModuleLoader2('Lazy', './components/lazy/module')
  // Working
  // const LazyLoadComponent2 = ModuleLoader(() => import(/* webpackChunkName: "LazyFoo" */'./components/lazy/module'), 'Lazy')
  const LazyLoadComponent = ModuleLoader3('./components/lazy/module')

  return (
    <div>
      <ConnectedStatic />
      {/*<LazyLoadComponent />*/}
      <LazyLoadComponent />
    </div>
  )
}

