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


module.exports = router;