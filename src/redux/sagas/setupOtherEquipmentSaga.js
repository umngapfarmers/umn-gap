import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getOtherEquipment(action){
  try{
    let result = yield axios.get('/setup/equipment/equipment_other');
    yield put({type: 'SET_OTHER_EQUIPMENT', payload: result.data});
  }
  catch(error){
    console.log(`Couldn't get other equipment list `, error);
    alert(`Sorry! Can't update the equipment list right now. Please try again later.`);
    
  }
}

function* addOtherEquipment(action){
    try{
      yield axios.post('/setup/equipment/new/equipment_other', action.payload);
      yield put({type: 'GET_OTHER_EQUIPMENT'});
    }
    catch (error){
      console.log(`Error adding equipment `, error);
      alert(`Sorry! Was unable to add an equipment of type other. Try again later.`)
    }
}

function* deleteOtherEquipment(action){
  try{
    console.log(`in delete other equipment`);
    let id = action.payload.id;
    yield axios.delete(`/setup/equipment/delete/equipment_other/${id}`);
    yield put({type: 'GET_OTHER_EQUIPMENT'});


  }
  catch(error){
    console.log(`Error deleting equipment `, error);
    alert(`Sorry! Wasn't able to delete that equipment. Please try again.`);

  }
}

function* setupEquipmentSaga() {
  yield takeLatest('GET_OTHER_EQUIPMENT', getOtherEquipment)
  yield takeLatest('ADD_OTHER_EQUIPMENT', addOtherEquipment);
  yield takeLatest('DELETE_OTHER_EQUIPMENT', deleteOtherEquipment);

}

export default setupEquipmentSaga;