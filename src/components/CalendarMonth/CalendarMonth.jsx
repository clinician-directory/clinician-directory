import {React, Component} from 'react';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function CalendarMonth() {

  const myApiKey = process.env.API_KEY;
const calendarId = 1

  return (
    <div className="container">
      <p>Info Page</p>
        <FullCalendar
          plugins={[timeGridPlugin, googleCalendarPlugin]}
          googleCalendarApiKey={myApiKey}
          weekends={true}
          slotMinTime={'08:00:00'}
          slotMaxTime={'22:00:00'}
          events={calendarId}
        />
    </div>
  );
}

export default CalendarMonth;
