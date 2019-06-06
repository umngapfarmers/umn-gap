import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// 
function* addWorkerSaga(action) {
    try {
        yield axios.post('/addworker', action.payload)
    }
    catch (error) {
        alert(`Sorry! Was unable to add the worker! Try again later.`)
    }
}

function* workerSaga() {
    yield takeLatest("POST_WORKER", addWorkerSaga);
    yield takeLatest("POST_EMPLOYEE", addWorkerSaga);

}

export default workerSaga;