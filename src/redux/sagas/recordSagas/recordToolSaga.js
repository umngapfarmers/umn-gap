import axios from 'axios';
import {
    put,
    takeLatest
} from 'redux-saga/effects';


function* getToolRecordSaga(action) {
    try {
        console.log('action.payload', action.payload);
        let result = yield axios.get(`/record/tool/?harvest_year_id=${action.payload}`);
        yield put({
            type: 'SET_RECORD_TOOL',
            payload: result.data
        })

    } catch (error) {
        alert(`Sorry! Was unable to get tool record! Try again later.`)
    }
}


function* recordToolSaga() {
    yield takeLatest('GET_RECORD_TOOL', getToolRecordSaga);
}

export default recordToolSaga;