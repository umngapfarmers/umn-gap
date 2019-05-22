import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// 
// function* GetHarvestYearSaga(action) {
//     console.log('in HarvestYearSaga', action.payload)
//     try {
//         yield axios.post('/hyear', action.payload)
//     }
//     catch (error) {
//         console.log('ERROR IN harvest year Get', error);
//         alert(`Sorry! Was unable to fetch! Try again later.`)
//     }
// }
function* GetHarvestYearSaga() {
    try {
        const hYear = yield axios.get("/hyear");
        console.log("this is fetch havest year", hYear.data);
        yield put({ type: "SET_HARVEST_YEAR", payload: hYear.data });
    } catch (err) {
        console.log(`couldn't fetch harvest Years`, err);
    }
}

function* harvestYearSaga() {
    yield takeLatest("FETCH_HARVEST_YEAR", GetHarvestYearSaga);
}

export default harvestYearSaga;