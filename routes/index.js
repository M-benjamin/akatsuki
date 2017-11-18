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


    let userForm = {
        username: req.body.username,
        password: req.body.password
    }


    //request to database for find user by username
    db.users.findOne({ where: { username: userForm.username } }).then(u => {

        console.log('get from database ' + u.id + u.username);

        if (!u) {
            //if not find username redirect
            res.redirect('/sign_in');
        } else if (u.checkPassword(userForm.password)) {
            /*
             * if it find something  create an method 
             * wich go to database check 
             * the password 
             */
            console.log(req.session);
            req.session.id = u.id;
            req.session.name = u.username;

            console.log('my session is:' + req.session);

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
        birthday: req.body.birth,
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
    console.log(req.session.name);

    db.users.findOne({ where: { username: req.session.name } }).then(data => {

        res.render('dashboard', { user: 'ben' });
    })
});

/* Get Dashboard */
router.post('/dashboard', (req, res) => {
    res.render('dashboard');
});

module.exports = router;