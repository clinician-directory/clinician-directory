// Used to store a selected availability
const clickedAvailability = (state = {}, action) => {
    switch (action.type) {
      case 'SET_ONE_AVAILABILITY':
        //return action.payload //returning undefined and not going to next page
        return {...state, selectedTime : action.payload}; //this proceeds to next page but shows undefined
      default:
        return state;
    }
  }


  //return {...state, selectedGlobalTriviaTab : action.payload};
  export default clickedAvailability;