import * as React from 'react'
import { baseKey } from './module'
import { useState } from 'react'

// Need to force a re render
export const Lazy = () => {
  const [value, setValue] = useState('foo')
  return <h1 onClick={() => setValue('bar')}>Lazy: { baseKey }: { value }</h1>
}



