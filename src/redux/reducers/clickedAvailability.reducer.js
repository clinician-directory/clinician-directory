// Used to store a selected availability
const clickedAvailability = (state = {}, action) => {
    switch (action.type) {
      case 'SET_ONE_AVAILABILITY':
        return action.payload;
      default:
        return state;
    }
  }

  
  export default clickedAvailability;