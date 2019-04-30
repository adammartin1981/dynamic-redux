import * as React from 'react';
import { ConnectedStatic } from './components/static'
import { ModuleLoader } from "./index"

export const App: React.FC = () => {
  const LazyLoadComponent = ModuleLoader(() => import(/* webpackChunkName: "Lazy" */'./components/lazy/module'))
  const LazyLoadComponent2 = ModuleLoader(() => import(/* webpackChunkName: "Lazy" */'./components/lazy/module'))

  return (
    <div>
      <ConnectedStatic />
      <LazyLoadComponent />
      <LazyLoadComponent2 />
    </div>
  )
}

