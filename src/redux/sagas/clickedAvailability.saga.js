import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


// Get a specified provider
function* fetchThisOneAvailability(action) {
  try {
      const response = yield axios.get(`/api/availabilities/${action.payload}`);
      console.log('Inside fetch one availability saga:', action.payload);
      yield put({ 
        type: 'SET_ONE_AVAILABILITY', 
        payload: response.data
      }); 
    } catch(error) { console.log('fetch This one provider saga error', error)}  

}




function* clickedAvailabilitySaga() {

  yield takeEvery('FETCH_THIS_ONE_AVAILABILITY', fetchThisOneAvailability);

}

export default clickedAvailabilitySaga;
