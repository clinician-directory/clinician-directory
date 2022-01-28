import React from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'

function ChooseProvider() {
//   const user = useSelector((store) => store.user);

  const history = useHistory();

  const handleSchedule = () => {
    history.push('/calendarmonth')
  }


  return (
    <div className="container">
    <button>Schedule an Appointment!</button>
      <h2> These are providers available!</h2>
      <p>Name</p>
      <p>Specialty</p>
      <p>address</p>
     
      <button onClick={handleSchedule}>Schedule!</button>
    </div>
  );
}

export default ChooseProvider;
