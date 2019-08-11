import axios from 'axios';
import {
  put,
  takeLatest
} from 'redux-saga/effects';


function* getOtherFacility(action) {
  try {
    let result = yield axios.get('/setup/packing');
    yield put({
      type: 'SET_PACKING_SETUP',
      payload: result.data
    });
  } catch (error) {
    console.log(`Couldn't get other facility list `, error);
    alert(`Sorry! Can't update the facility list right now. Please try again later.`);

  }
}

function* addOtherFacility(action) {
  try {
    yield axios.post('/setup/packing/new', action.payload);
    yield put({
      type: 'GET_PACKING_FACILITY'
    });
  } catch (error) {
    console.log(`Error adding facility `, error);
    alert(`Sorry! Was unable to add a packing facility. Try again later.`)
  }
}

function* deleteOtherFacility(action) {
  try {
    console.log(`in delete packing facility`);
    let id = action.payload.id;
    yield axios.delete(`/setup/packing/${id}`);
    yield put({
      type: 'GET_PACKING_FACILITY'
    });


  } catch (error) {
    console.log(`Error deleting facility `, error);
    alert(`Sorry! Wasn't able to delete that facility. Please try again.`);

  }
}

function* setupFacilitySaga() {
  yield takeLatest('GET_PACKING_FACILITY', getOtherFacility)
  yield takeLatest('ADD_PACKING_FACILITY', addOtherFacility);
  yield takeLatest('DELETE_PACKING_FACILITY', deleteOtherFacility);

}

export default setupFacilitySaga;