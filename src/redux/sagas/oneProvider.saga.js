import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


// Get a specified provider
function* fetchThisOneProvider(action) {
  try {
      const response = yield axios.get(`/api/providers/${action.payload}`);
      console.log('Inside fetch one provider saga:', action.payload);
      yield put({ 
        type: 'SET_ONE_PROVIDER', 
        payload: response.data
      }); 
    } catch(error) { console.log('fetch This one provider saga error', error)}  

}




function* oneProviderSaga() {

  yield takeEvery('FETCH_THIS_ONE_PROVIDER', fetchThisOneProvider);

}

export default oneProviderSaga;
