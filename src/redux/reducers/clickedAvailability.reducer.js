// Used to store a selected availability
const clickedAvailability = (state = {}, action) => {
    switch (action.type) {
      case 'SET_ONE_AVAILABILITY':
        return action.payload;
      default:
        return state;
    }
  }


  function generate(state={} ,action) {
    switch (action.type) {
      case randomNumber:
        return {
          ...state,
          random: action.payload
        }   
      default: // need this for default case
        return state 
     }
  }
  
  export default clickedAvailability;