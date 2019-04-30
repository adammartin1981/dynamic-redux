import { takeLatest } from "@redux-saga/core/effects";

const handleStatic = (action: any) => {
    console.log('HANDLE STATIC CALLED', action)
}

export const sagas = function*() {
    yield takeLatest('STATIC', handleStatic)
}