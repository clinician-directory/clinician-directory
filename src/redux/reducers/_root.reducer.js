import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import appointmentsReducer from './appointments.reducer';
import allProvidersReducer from './allProviders.reducer';
import oneProviderReducer from './oneProvider.reducer';
import availabilitiesReducer from './availabilities.reducer';
import currentTabReducer from './currentTab.reducer';
import clickedAvailability from './clickedAvailability.reducer';
import appointmentDetailsReducer from './appointmentDetails.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  appointmentsReducer, // for appointments
  allProvidersReducer, // for providers
  oneProviderReducer, // for one provider
  availabilitiesReducer, // for provider availabilities
  currentTabReducer,
  clickedAvailability,
  appointmentDetailsReducer
});

export default rootReducer;
