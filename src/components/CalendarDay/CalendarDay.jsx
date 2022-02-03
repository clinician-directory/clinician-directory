import React from "react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../Navigation/Navigation";
import "./CalendarDay.css";

function CalendarDay() {
  // Define dispatch
  const dispatch = useDispatch();
  // Define history in order to route to page
  const history = useHistory();
  // to access reducers in this component
  // Grab reducers from the redux store via useSelector
  //const userAppointments = useSelector((store) => store.appointmentsReducer);
  const availabilities = useSelector((store) => store.availabilitiesReducer);

  const handleButton = () => {
    //takes user to select providers
    history.push("/provider");
  };

    // TO RUN ON PAGE LOAD
    useEffect(() => {
        dispatch({ type: 'FETCH_AVAILABILITIES' })
      }, [])  
      




  return (
    <div>
      <h1> Calendar Day </h1>

        {availabilities.map((showAvailabilities) => {
            console.log('inside MAP', showAvailabilities)
            return ( 
            <ul key={showAvailabilities.id}>
              {showAvailabilities.day}
              {showAvailabilities.start_time}
              {showAvailabilities.provider_id}
            </ul>
            )})}

      <button onClick={handleButton}> Select Provider</button>
      <Navigation />
    </div>
  ); //end return
} //end CalendarDay function

export default CalendarDay;
