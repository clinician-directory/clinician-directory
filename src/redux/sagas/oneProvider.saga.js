import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


// Get a specified provider
function* fetchThisOneProvider(action) {
  try {
      const clickedProvider = yield axios(`/api/providers/${action.payload}`);
      console.log('Inside fetch one provider saga:', action.payload);
      yield put({ 
        type: 'SET_ONE_PROVIDER', 
        payload: clickedProvider.data
      }); 
    } catch(error) { console.log('fetch This one provider saga error', error)}  

}

function* postAppointment(action) {
  console.log('This postAppointment action:', action);

  try{
    axios({
      method: 'POST',
      url: '/api/appointments',
      data: action.payload
    })

    yield put({ type: 'FETCH_USER_APPOINTMENTS'})
  } catch {
    console.log('POST error');
  }
  
}




function* oneProviderSaga() {

  yield takeEvery('FETCH_THIS_ONE_PROVIDER', fetchThisOneProvider);
  yield takeEvery('POST_APPOINTMENT', postAppointment);

}

export default oneProviderSaga;
