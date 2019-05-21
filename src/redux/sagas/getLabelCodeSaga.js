import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getLabelCode(action){
    console.log('in getLabelCodeSaga')
    try{
        let result = yield axios.get(`/setup/label_code/`)
        console.log(`result label codes `, result.data);
        
        yield put({type: "SET_LABEL_CODE", payload: result.data})
        
    }
    catch (error){
        console.log('ERROR IN getLabelCodeSaga GET', error);
        alert(`Sorry! Was unable to setup the farm! Try again later.`)
    }
}

function* getLabelCodeSaga() {
//   yield takeLatest('ADD_FARM', addFarmSaga);
  yield takeLatest('GET_LABEL_CODE', getLabelCode);
}

export default getLabelCodeSaga;
