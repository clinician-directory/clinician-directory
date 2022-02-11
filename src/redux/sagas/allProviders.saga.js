import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


//This will fetch ALL providers from our DB
function* fetchAllProviders() {
  try {
    const providers = yield axios.get('/api/providers');
    yield put({ type: 'SET_PROVIDERS', payload: providers.data });
  } catch (error) {
    console.log('Error in fetchAllProviders saga', error);
  }
};

// Saga function to fetch all available providers at appt time selected
function* fetchAllAvailableProviders(action) {
  try {
    console.log(action.payload)
    const response = yield axios({
      method: 'GET',
      url: `/api/providers/by_availability?appointment_start=${action.payload}`
    });
    // console.log('in fetchAllAvailableProviders', response.data);
    yield put({
      type: 'SET_AVAILABLE_PROVIDERS',
      payload: response.data
    });
  } catch (error) {
    console.log('Error in fetchAllAvailableProviders saga', error);
  }
};

function* AllProvidersSaga() {
  yield takeEvery('FETCH_ALL_PROVIDERS', fetchAllProviders);
  yield takeEvery('FETCH_ALL_AVAILABLE_PROVIDERS', fetchAllAvailableProviders);
}

export default AllProvidersSaga;
