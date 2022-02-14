const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// GET route to return all users appointments
// only accessible for logged in users
router.get('/', rejectUnauthenticated, (req, res) => {

  let queryText;
  let queryValues;

  // get appts from DB but only for logged in user
  queryText = `
    SELECT * FROM "appointments"
      WHERE "user_id"=$1;
  `;
  queryValues = [req.user.id]

  pool.query(queryText, queryValues)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((dbErr) => {
      console.log(dbErr);
      res.sendStatus(500);
    });
});


// GET route to return appointment details
// only accessible for logged in users
router.get('/:id', rejectUnauthenticated, (req, res) => {

  let queryText;
  let queryValues;

  // get appt from DB by id
  // check to make sure logged in user matches appt user id
  queryText = `
    SELECT * FROM "appointments"
	  JOIN "providers"
	  ON "appointments"."provider_id"="providers"."id"
        WHERE "appointments"."id"=$1 AND "user_id"=$2;
  `;
  queryValues = [req.params.id, req.user.id]

  pool.query(queryText, queryValues)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((dbErr) => {
      console.log(dbErr);
      res.sendStatus(500);
    });
});



// POST an appointment from the logged in user to the db
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('INSIDE app POST route', req.body);
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  const sqlText = `
    INSERT INTO "appointments"
      ("user_id", "start_time", "end_time", "provider_id")
      VALUES
      ($1, $2, $3, $4);
  `;
  const sqlValues = [
    req.body.user_id,
    req.body.start_time,
    req.body.end_time,
    req.body.provider_id
  ];
  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      console.error(dbErr);
      res.sendStatus(500);
    });
});


module.exports = router;