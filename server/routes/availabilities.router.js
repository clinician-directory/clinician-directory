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
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('ERROR: Get all availabilties', err);
      res.sendStatus(500)
    })
});


module.exports = router;
