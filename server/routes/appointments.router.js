const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// GET route to return all appointments
// only accessible for logged in users
router.get('/', rejectUnauthenticated, (req, res) =>{
// send back accepted status for now
res.sendStatus(202);
});


module.exports = router;