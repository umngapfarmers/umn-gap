import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getPersonSaga(action) {
    console.log('in getPersonSaga')
    try {
        let result = yield axios.get(`/manage/person`)
        console.log(`result label codes `, result.data);

        yield put({ type: "SET_PERSON", payload: result.data })

    }
    catch (error) {
        console.log('ERROR IN getPersonSaga GET', error);
        alert(`Sorry! Was unable to setup the farm! Try again later.`)
    }
}

function* editemployeeSaga(action) {
    console.log('in getPersonSaga')
    try {
        let result = yield axios.put(`/manage/person`, action.payload)
        console.log(`result label codes `, result.data);

        yield put({ type: "SET_PERSON", payload: result.data })

    }
    catch (error) {
        console.log('ERROR IN getPersonSaga GET', error);
        alert(`Sorry! Was unable to setup the farm! Try again later.`)
    }
}

function* getUserSaga(action) {
    console.log('in getPersonSaga')
    try {
        let result = yield axios.get(`/manage/user`)
        console.log(`result label codes `, result.data);

        yield put({ type: "SET_USER", payload: result.data })

    }
    catch (error) {
        console.log('ERROR IN getPersonSaga GET', error);
        alert(`Sorry! Was unable to setup the farm! Try again later.`)
    }
}

function* editPersonSaga(action) {
    try {
        const selectedPerson=yield axios.get(`/manage/person/edit/?person_id=${action.payload}`);
        console.log("this is fetch product for one product", selectedPerson.data);
        yield put({ type: "SET_EDIT_PERSON", payload: selectedPerson.data });

         //yield put({ type: "GET_PERSON" });
    } catch (err) {
        console.log(`couldn't edit Person`, err);
    }
}

function* manageUSerSaga() {
    //   yield takeLatest('ADD_FARM', addFarmSaga);
    yield takeLatest('GET_PERSON', getPersonSaga);
    yield takeLatest('EDIT_PERSON', editemployeeSaga);

    yield takeLatest('GET_USER', getUserSaga);
    yield takeLatest('GET_PERSON_TO_EDIT', editPersonSaga)

}

export default manageUSerSaga;