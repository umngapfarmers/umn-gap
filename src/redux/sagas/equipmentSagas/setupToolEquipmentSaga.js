import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getEquipment(action) {
  try {
    let result = yield axios.get('/setup/equipment/tool');
    yield put({
      type: 'SET_TOOL',
      payload: result.data
    });
  } catch (error) {
    console.log(`Couldn't get tool equipment list `, error);
    alert(`Sorry! Can't update the equipment list right now. Please try again later.`);

  }
}

function* addEquipment(action) {
  try {
    yield axios.post('/setup/equipment/tool/new', action.payload);
    yield put({
      type: 'GET_TOOL'
    });
  } catch (error) {
    console.log(`Error adding equipment `, error);
    alert(`Sorry! Was unable to add an equipment. Try again later.`)
  }
}

function* deleteEquipment(action) {
  try {
    console.log(`in delete other equipment`);
    let id = action.payload.id;
    yield axios.delete(`/setup/equipment/tool/delete/${id}`);
    yield put({
      type: 'GET_TOOL'
    });


  } catch (error) {
    console.log(`Error deleting equipment `, error);
    alert(`Sorry! Wasn't able to delete that equipment. Please try again.`);

  }
}

function* setupEquipmentSaga() {
  yield takeLatest('GET_TOOL', getEquipment)
  yield takeLatest('ADD_TOOL', addEquipment);
  yield takeLatest('DELETE_TOOL', deleteEquipment);
}

export default setupEquipmentSaga;