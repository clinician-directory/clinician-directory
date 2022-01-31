const appointmentsReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_APPOINTMENTS':
      return action.payload;
    case 'CLEAR_APPOINTMENTS':
      return [];
    default:
      return state;
  }
};

export default appointmentsReducer;