import React from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'

function UserPage() {
  const user = useSelector((store) => store.user);

  const history = useHistory();

  const handleSchedule = () => {
    history.push('/calendarmonth')
  }

  const handleProviders = () => {
    history.push('/chooseprovider')
  }


  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <h2>Confirm Profile</h2>
      <p>First Name: <input type="text" /></p>
      <p>Last Name:<input type="text" /></p>
      <p>Address:<input type="text" /> </p>
      <button onClick={handleSchedule}>Schedule an Appointment!</button>
      <button onClick={handleProviders}>See Providers!</button>
    </div>
  );
}

export default UserPage;
