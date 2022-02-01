import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


//This will fetch ALL providers from our DB
function* fetchAllProviders() {
  try {
    const providers = yield axios.get('/api/providers');
    yield put({ type: 'LOAD_PROVIDERS', payload: providers.data });
  } catch (error) {
    console.log('Error in fetchAllProviders saga', error);
  }
}




function* AllProvidersSaga() {
  yield takeEvery('FETCH_ALL_PROVIDERS', fetchAllProviders);
}

export default AllProvidersSaga;
