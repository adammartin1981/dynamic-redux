import { takeLatest } from "@redux-saga/core/effects";

const handleLazy = (action: any) => {
  console.log('HANDLE LAZY CALLED', action)
}

export const sagas = function*() {
  yield takeLatest('LAZY', handleLazy)
}