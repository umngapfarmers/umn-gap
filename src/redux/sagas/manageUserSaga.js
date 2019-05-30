import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getPersonSaga(action) {
    console.log('in getPersonSaga')
    try {
        let result = yield axios.get(`/manage/person`)
        console.log(`result label codes `, result.data);

        yield put({ type: "SET_EDIT_PERSON", payload: result.data })

    }
    catch (error) {
        console.log('ERROR IN getPersonSaga GET', error);
        alert(`Sorry! Was unable to setup the farm! Try again later.`)
    }
}

function* editemployeeSaga(action) {
    console.log('in getPersonSaga')
    try {
        let result = yield axios.put(`/manage/person/edit`, action.payload)
        console.log(`result label codes `, result.data);

        yield put({ type: "SET_EDIT_PERSON", payload: result.data })

    }
    catch (error) {
        console.log('ERROR IN getPersonSaga GET', error);
        alert(`Sorry! Was unable to setup the farm! Try again later.`)
    }
}


// function* editUserSaga(action) {
//     console.log('in getuserSaga')
//     try {
//         let result = yield axios.put(`/manage/user`, action.payload)
//         console.log(`result user `, result.data);

//         yield put({ type: "SET_EDIT_USER", payload: result.data })

//     }
//     catch (error) {
//         console.log('ERROR IN getuserSaga GET', error);
//         alert(`Sorry! Was unable to get user for edit! Try again later.`)
//     }
// }

function* getUserSaga(action) {
    console.log('in getPersonSaga')
    try {
        let result = yield axios.get(`/manage/user`)
        console.log(`result label codes `, result.data);

        yield put({ type: "SET_EDIT_USER", payload: result.data })

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
function* editPickUserSaga(action) {
    try {
        const selectedUser=yield axios.get(`/manage/user/edit/?user_id=${action.payload}`);
        console.log("this is fetch user for one user", selectedUser.data);
        yield put({ type: "SET_EDIT_USER", payload: selectedUser.data });

         //yield put({ type: "GET_PERSON" });
    } catch (err) {
        console.log(`couldn't edit User`, err);
    }
}

function* editUserPasswordlessSaga(action) {
    try{
      yield axios.put(`/manage/user/passwordless`, action.payload)

    }
    catch (error) {
        console.log('ERROR IN editUserPasswordlessSaga PUT', error);
        alert(`Sorry! Was unable to edit user! Try again later.`)
    }
}

function* editUserPasswordSaga(action) {
    try{
      yield axios.put(`/manage/user/password`, action.payload)

    }
    catch (error) {
        console.log('ERROR IN editUserPasswordSaga PUT', error);
        alert(`Sorry! Was unable to edit user! Try again later.`)
    }
}


function* editPersonNewUserSaga(action) {
    try{
      yield axios.put(`/manage/person/editNewUser`, action.payload)

    }
    catch (error) {
        console.log('ERROR IN editUserPasswordSaga PUT', error);
        alert(`Sorry! Was unable to edit user! Try again later.`)
    }
}

function* manageUSerSaga() {
    //   yield takeLatest('ADD_FARM', addFarmSaga);
    yield takeLatest('GET_PERSON', getPersonSaga);
    yield takeLatest('EDIT_PERSON', editemployeeSaga);
    // yield takeLatest('EDIT_USER', editUserSaga);
    yield takeLatest('GET_USER', getUserSaga);
    yield takeLatest('GET_PERSON_TO_EDIT', editPersonSaga);
    yield takeLatest('GET_USER_TO_EDIT', editPickUserSaga);
    yield takeLatest('EDIT_USER_PASSWORDLESS', editUserPasswordlessSaga);
    yield takeLatest('EDIT_USER_PASSWORD', editUserPasswordSaga);
    yield takeLatest('EDIT_PERSON_NEW_USER', editPersonNewUserSaga)

}

export default manageUSerSaga;