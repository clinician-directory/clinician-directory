const appointmentDetailsReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_APPOINTMENT_DETAILS':
      return action.payload;
    case 'CLEAR_APPOINTMENT_DETAILS':
      return [];
    default:
      return state;
  }
};

export default appointmentDetailsReducer;