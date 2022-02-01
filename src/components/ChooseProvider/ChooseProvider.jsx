import React from 'react';
import {useHistory} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './ChooseProvider.css';



function ChooseProvider() {



  const history = useHistory();
  const dispatch = useDispatch();


  //handles button to go to calendar view
  const handleSchedule = () => {
    history.push('/calendarmonth')
  }

  //Accessing Redux/Reducer
  const providers = useSelector(store => store.allProvidersReducer)
  //const selectedProvider = useSelector(store => store.OneProviderReducer)

  //creating local states for clinicians to enter in new providers to add to the database

  // TO RUN ON PAGE LOAD
  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_PROVIDERS' })
  }, [])  


  return (
    <div className="container">
    
      <h2> These are providers available!</h2>
      <p>Name</p>
      <p>Specialty</p>
      <p>address</p>
      <div>
        <ul>
      {providers.map((allProviders) => {
        return (
          <div>
          <p>
            {allProviders.first_name} {allProviders.last_name}
             {allProviders.specialty} {allProviders.telemedicine}
             {allProviders.city} {allProviders.city} {allProviders.health_system}
             {allProviders.address} {allProviders.state}{allProviders.zip_code}
          </p>
          </div>
        )
      })}

      </ul>
      </div>
   
      
      <button onClick={handleSchedule}>Schedule Appointment!</button>
    </div>
  );
}

export default ChooseProvider;
