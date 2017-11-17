const express = require('express');
const router = express.Router();

const db = require('../database/init');

/* GET home page. */
router.get('/', (req, res) => {
    res.render('index');
});

/* GET sign up page. */
router.get('/sign_in', (req, res) => {
    res.render('signin');
});

/* POST sign up page. */
router.post('/sign_in', (req, res) => {


    let user = {
        username: req.body.username,
        password: req.body.password
    }

    console.log(usersF);

    //request to database for find user by username
    db.users.findOne({ where: { username: usersF.username } }).then(u => {

        if (!u) {
            //if not find username redirect
            res.redirect('/sign_in');
        } else if (u.checkpassword(password)) {
            /*
             * if it find something  create an method 
             * wich go to database check 
             * the password 
             */
            // req.session.id = u;
            // req.session.id = u.dataValues;
            res.redirect('/dashboard');

        } else {
            res.redirect('/sign_in');
        }
    })
});

/* GET sign up page. */
router.get('/sign_up', (req, res) => {
    res.render('signup');
});

/* POST sign up page. */
router.post('/sign_up', (req, res) => {
    //create an object which get value from my form
    let user = {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        password_confirm: req.body.password_confirm
    }

    console.log(user);

    db.users.create(user).then(usersF => {

        res.redirect('/dashboard');

    }).catch(error => {
        console.log(error);
        res.redirect('/sign_in');
    });
});

/* Get Dashboard */
router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

module.exports = router;