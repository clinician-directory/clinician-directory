
import React from "react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../Navigation/Navigation";
import "./CalendarDay.css";

//MUI implementation:
import { Button, Card, CardActionArea, CardMedia, Typography, CardContent } from "@material-ui/core";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
//SweetAlert implementation:
import swal from 'sweetalert';



function CalendarDay() {
  // Define dispatch
  const dispatch = useDispatch();
  // Define history in order to route to page
  const history = useHistory();
  // to access reducers in this component
  // Grab reducers from the redux store via useSelector
  const user = useSelector((store) => store.user);
  //const userAppointments = useSelector((store) => store.appointmentsReducer);
  const availabilities = useSelector((store) => store.availabilitiesReducer);
  const availableProvider = useSelector((store) => store.oneProviderReducer);
  const clickedAvailability = useSelector((store) => store.clickedAvailability);

  

  

  const handleButton = () => {
    //takes user to select providers
    history.push("/provider");
  };

    // // TO RUN ON PAGE LOAD
    // useEffect(() => {
    //     dispatch({ 
    //       type: 'FETCH_THIS_ONE_AVAILABILITY'
    //     })
    //   }, [])  





  return (
    <div>
      <h1> {user.username}, Please confirm Date & time Selected </h1>

        {availabilities.map((showAvailabilities) => {
            console.log('inside MAP', showAvailabilities)
            return ( 
            <ul key={showAvailabilities.id}>
              {showAvailabilities.day}
              {showAvailabilities.start_time}
              {showAvailabilities.provider_id}
            </ul>
            )})}
               
      <h4>
        Next, select a provider:
        <button className="button" onClick={handleButton}> Select Provider</button>
      </h4>
      <Navigation />
    </div>
  ); //end return
} //end CalendarDay function


export default CalendarDay;
