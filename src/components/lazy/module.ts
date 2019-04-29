import { Lazy } from './lazy'
import { reducer } from './reducer'
import { Module } from '../../App'

export let baseKey: string = 'ORIGINAL_KEY'

// Cannot use the reserved word module
// export const module: Module = {
const m: Module = {
  component: Lazy,
  reducer,
  baseKey,
  changeKey: (newValue: string) => {
    console.log('Update the module')
    baseKey = newValue
  }
}

export default m