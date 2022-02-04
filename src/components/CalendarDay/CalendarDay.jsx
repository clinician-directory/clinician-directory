import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import dayGridPlugin from '@fullcalendar/timegrid';
import FullCalendar from '@fullcalendar/react';

import './CalendarDay.css';

function CalendarDay() {

  return (
    <div>

        <Grid container>
            <Grid item id='calendar-day'>
                <FullCalendar
                    plugins={[ dayGridPlugin ]}
                    weekends={true}
                    // initialView='dayGridWeek'
                    events={[
                        { title: 'event 1', date: '2019-04-01' },
                        { title: 'event 2', date: '2019-04-02' }
                    ]}
                />
            </Grid>
        </Grid>

       


    </div>
  );
}

export default CalendarDay;
