import * as React from 'react';
import { ConnectedStatic } from './components/static'
import { LoadableLazy } from "./index"

export const App: React.FC = () => {
  const LLB = LoadableLazy(() => import('./components/lazy/module'))

  console.log('LLB', LLB)

  return (
    <div>
      <ConnectedStatic />
      <LLB />
    </div>
  )
}

