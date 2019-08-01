import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* addOtherEquipment(action){
    try{
      console.log(`in other equipment`)
        yield axios.post('/setup/equipment/new/equipment_other', action.payload);
        // let result = yield axios.get(`/setup/compost`);
        // yield put({type: 'SET_COMPOST_SETUP', payload: result.data})

    }
    catch (error){
        alert(`Sorry! Was unable to add an equipment of type other. Try again later.`)
    }
}

function* setupEquipmentSaga() {
  yield takeLatest('ADD_OTHER_EQUIPMENT', addOtherEquipment);

}

export default setupEquipmentSaga;