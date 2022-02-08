const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route to get ALL providers in our DB
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM "providers"`)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: in GET route for all providers', err);
      res.sendStatus(500)
    })
});

//Getting a provider by id:
router.get('/:id', rejectUnauthenticated, (req, res) => {
    const selectedProvider = req.params.id;
    const sqlText = `
    SELECT * FROM "providers"
          WHERE "id"=$1;`;
    const sqlValues = [selectedProvider]
    pool.query(sqlText,sqlValues)
    .then( result => {
      res.send(result.rows);
    })
  .catch(err => {
      console.log('ERROR: in GET route by ID - Getting clicked provider', err);
      res.sendStatus(500)
    })
  });

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
