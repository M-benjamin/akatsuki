const express = require('express');
const router = express.Router();

const db = require('../database/init');

/* GET home page. */
router.get('/', (req, res) => {
    db.user.count().then((nb) => {
        res.render('index', { count: nb });
    });
});

/* GET sign up page. */
router.get('/sign_up', (req, res) => {
    res.render('signup');
});

/* POST sign up page. */
router.post('/sign_up', (req, res) => {
    res.render('signup');
});


module.exports = router;