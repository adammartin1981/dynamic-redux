import { takeLatest } from "@redux-saga/core/effects";

const handleLazy = (action: any) => {
  console.log('HANDLE LAZY CALLED', action)
}

const handleLazyInit = (action: any) => {
  console.log('HANDLE LAZY INIT', action)
}

export const sagas = function*() {
  yield takeLatest('LAZY', handleLazy)
  yield takeLatest('INIT', handleLazyInit)
}