import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchAvailabilities() {
    // This saga function gets all the results from the DB
    // with the help of the /api/availabilities route
    // which goes to the get router in the availablites.router.js file
    // if successful, this will update the availabilites Reducer with the type and payload indicated below
    try {
        const availabilities = yield axios.get('/api/availabilities');
        console.log('get all:', availabilities.data);
        yield put({ type: 'LOAD_AVAILABILITIES', payload: availabilities.data });
    } catch {
        console.log('get all error');
    }
}

function* resultSaga() {
    yield takeLatest('FETCH_AVAILABILITIES', fetchAvailabilities);
}

export default resultSaga;
