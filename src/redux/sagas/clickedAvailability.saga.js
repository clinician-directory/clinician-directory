import { put, takeEvery,takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// Get a selected availability
function* fetchThisOneAvailability(action) {
  console.log('');
  
  try {
      const clickedTime = yield axios(`/api/availabilities/${action.payload}`);
      console.log('Inside fetch one availability saga:', action.payload);
      yield put({ 
        type: 'SET_ONE_AVAILABILITY', 
        payload: clickedTime.data
      }); 
    } catch(error) { console.log('ERROR in fetching one availability saga', error)}  

}




function* clickedAvailabilitySaga() {

  yield takeEvery('FETCH_THIS_ONE_AVAILABILITY', fetchThisOneAvailability);

}

export default clickedAvailabilitySaga;
