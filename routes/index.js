const express = require('express');
const router = express.Router();

const db = require('../database/init');

/* GET home page. */
router.get('/', (req, res) => {
    db.user.count().then((nb) => {
        res.render('index', { count: nb });
    });
});

module.exports = router;