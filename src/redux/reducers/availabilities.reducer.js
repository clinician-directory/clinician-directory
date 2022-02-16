const availabilitiesReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_AVAILABILITIES':
      return action.payload;
    case 'CLEAR_AVAILABILITIES':
      return [];
    default:
      return state;
  }
};

export default availabilitiesReducer;
