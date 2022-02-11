const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route to get ALL providers in our DB
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  pool.query(`SELECT * FROM "providers"`)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: in GET route for all providers', err);
      res.sendStatus(500)
    })
});


/**
 * GET route to get providers with specific start time availability
 */
router.get('/by_availability', rejectUnauthenticated, (req, res) => {

  /* declare start variable and set equal to start time availability but reformat
  to database friendly date and time */
  let startQuery = req.query.appointment_start;
  console.log(startQuery);

  // let start = new Date(startQuery).toISOString();

  const queryText = `
  SELECT "providers"."id", "providers"."first_name", "providers"."last_name",
    "providers"."specialty", "providers"."telemedicine", "providers"."city",
    "providers"."health_system", "providers"."address", "providers"."state",
    "providers"."zip_code" FROM "providers"
    JOIN "availabilities"
  	  ON "providers"."id" = "availabilities"."provider_id"
    LEFT OUTER JOIN "appointments"
  	  ON "providers"."id" = "appointments"."provider_id"
  	  AND "availabilities"."start_time" = "appointments"."start_time"
    WHERE
  	  "availabilities"."start_time" = $1
  	  AND "appointments"."id" IS NULL;
  `
  // queryValues = [start]
  queryValues = [startQuery]

  pool.query(queryText, queryValues)
  .then((result) => {
    console.log('result.rows', result.rows)
    res.send(result.rows);
  })
  .catch((err) => {
    console.log('ERROR: GET all providers by availability', err);
    res.sendStatus(500)
  });
});

// Getting a provider by id:
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const selectedProvider = req.params.id;
  const sqlText = `
    SELECT * FROM "providers"
          WHERE "id"=$1;`;
  const sqlValues = [selectedProvider]
  pool.query(sqlText, sqlValues)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: in GET route by ID - Getting clicked provider', err);
      res.sendStatus(500)
    })
});

module.exports = router;
