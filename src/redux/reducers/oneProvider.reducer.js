// Used to store ONE Provider from the server
const OneProvider = (state = {}, action) => {
    switch (action.type) {
      case 'SET_ONE_PROVIDER':
        return action.payload;
      default:
        return state;
    }
  }

  
  export default OneProvider;