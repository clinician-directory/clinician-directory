import React from 'react';
import {useHistory} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, CardActionArea, CardMedia, Typography, CardContent } from "@material-ui/core";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import './ChooseProvider.css';
import Navigation from '../Navigation/Navigation';
import swal from 'sweetalert';




function ChooseProvider() {

  const history = useHistory();
  const dispatch = useDispatch();


  //handles button to go to calendar view
  // const handleSchedule = () => {
  //   history.push('/calendarmonth')
  // }

  //Accessing Redux/Reducer
  const providers = useSelector(store => store.allProvidersReducer)
  //const selectedProvider = useSelector(store => store.OneProviderReducer)

  //creating local states for clinicians to enter in new providers to add to the database

  // TO RUN ON PAGE LOAD
  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_PROVIDERS' })
  }, [])

  const handleSchedule = (e) => {
    swal({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success",
    });
  }

  return (
    <div>
    <form>
      <h3 className="providers">List of providers</h3>
    </form>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, fontSize: 10, backgroundColor:'##bd9dcc', marginBottom: 10 }} aria-label="simple table">
          <TableHead>

            <TableRow>
              <TableCell align="left"> <Typography variant="h6" > FIRST NAME </Typography></TableCell>
              <TableCell align="right"> <Typography variant="h6"> LAST NAME </Typography> </TableCell>
              <TableCell align="right"> <Typography variant="h6"> SPECIALTY </Typography></TableCell>
              <TableCell align="right"> <Typography variant="h6"> TELEMEDICINE </Typography></TableCell>
              <TableCell align="right"> <Typography variant="h6"> CITY </Typography></TableCell>
              <TableCell align="right"> <Typography variant="h6"> HEALTH SYSTEM </Typography></TableCell>
              <TableCell align="right"> <Typography variant="h6"> ADDRESS </Typography></TableCell>
              <TableCell align="right"> <Typography variant="h6"> STATE </Typography></TableCell>
              <TableCell align="right"> <Typography variant="h6"> ZIP CODE </Typography></TableCell>
              <TableCell align="right"> <Typography variant="h6"></Typography></TableCell>
            </TableRow>

          </TableHead>
            <TableBody>
              {providers.map((allProviders) => {
                console.log('inside MAP', allProviders)
                      return (
                          <TableRow key={allProviders.id}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="left">{allProviders.first_name}</TableCell>
                                <TableCell align="center">{allProviders.last_name}</TableCell>
                                <TableCell align="center">{allProviders.specialty}</TableCell>
                                <TableCell align="center">{allProviders.telemedicine}</TableCell>
                                <TableCell align="center">{allProviders.city}</TableCell>
                                <TableCell align="center">{allProviders.health_system}</TableCell>
                                <TableCell align="center">{allProviders.address}</TableCell>
                                <TableCell align="center">{allProviders.state}</TableCell>
                                <TableCell align="center">{allProviders.zip_code}</TableCell>
                                <TableCell align="center"><button onClick={handleSchedule}>Schedule!</button></TableCell>
                          </TableRow>
                      )})}
                  </TableBody>
          </Table>
        </TableContainer>
        <Navigation/>
    </div>
      )//end return
}

export default ChooseProvider;
