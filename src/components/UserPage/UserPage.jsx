import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'

import Navigation from '../Navigation/Navigation';

function UserPage() {

  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const handleSchedule = (value) => {
    dispatch({ type: 'SET_TAB', payload: value })
    history.push('/calendar')
  }

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <h2>Confirm Profile</h2>
      <p>First Name: <input type="text" /></p>
      <p>Last Name:<input type="text" /></p>
      <p>Address:<input type="text" /> </p>
      <button onClick={()=>handleSchedule(1)}>Schedule an Appointment!</button>
      <Navigation/>
    </div>
  );
}

export default UserPage;
