// Used to store ONE Provider from the server
const oneProviderReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_ONE_PROVIDER':
        return action.payload;
      default:
        return state;
    }
  }

  
  export default oneProviderReducer;