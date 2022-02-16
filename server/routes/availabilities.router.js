const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Handles the GET route
// rejectUnauthenticated prevents anyone who is not logged in to use this
// This uses a sql query and values to get the data from db on postico
router.get('/', rejectUnauthenticated, (req, res) => {
  // Query that returns availabilities minus appointments
  // for ALL PROVIDERS, then filtered down to DISTINCT start_time / end_time pairs.
  // (Events for calendar)
  const query = `
    SELECT DISTINCT
	    "availabilities"."start_time",
	    "availabilities"."end_time"
    FROM "availabilities"
	    LEFT OUTER JOIN "appointments"
		    ON "availabilities"."provider_id" = "appointments"."provider_id"
		    AND "availabilities"."start_time" = "appointments"."start_time"
	    WHERE
		    "appointments"."id" IS NULL;
    `
  pool.query(query)
    .then((result) => {
      // console.log(result.rows);

      const availabilities = result.rows;
      const appointQuery = `
        SELECT * FROM "appointments"
        WHERE "user_id"=$1
      `
      pool.query(appointQuery, [req.user.id])
      .then((response)=>{

        const appointments = response.rows
        const events = []

        for (const availability of availabilities) {
          if ( !appointments.find(( {start_time} ) => start_time.getTime() === availability.start_time.getTime() ) ) {
            events.push(availability)
          }
        }

        res.send(events);
      })
      .catch((error)=>{
        console.log('ERROR:', error);
      })
    })
    .catch((err) => {
      console.log('ERROR: Get all availabilities', err);
      res.sendStatus(500)
    })
});

module.exports = router;
