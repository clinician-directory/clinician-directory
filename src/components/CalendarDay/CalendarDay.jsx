import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';



import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';

// import './LoginView.css';

function CalendarDay() {

  return (
    <div>


        <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridDay"
            weekends={true}
            events={[
                { title: 'event 1', date: '2019-04-01' },
                { title: 'event 2', date: '2019-04-02' }
            ]}
        />


    </div>
  );
}

export default CalendarDay;
