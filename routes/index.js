const express = require('express');
const router = express.Router();
const request = require('request');
const moment = require('moment');


const db = require('../database/init');

/* GET home page. */
router.get('/', (req, res) => {
    res.render('index');
});

/* GET sign up page. */
router.get('/sign_in', (req, res) => {
    res.render('signin');
});

/**============================
 * Post sign up page
 ==============================*/
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
            req.session.firstname = u.firstname;
            req.session.lastname = u.lastname;
            req.session.birthday = u.birthday;
            req.session.email = u.email;


            console.log('my session is:' + req.session);

            res.redirect('/dashboard');

        } else {
            res.redirect('/sign_in');
        }
    })
});

/**============================
 * get sign up page
 ==============================*/
router.get('/sign_up', (req, res) => {
    res.render('signup');
});

/**============================
 * POst sign in
 ==============================*/
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

/**============================
 * Get Dashboard page
 ==============================*/
router.get('/dashboard', (req, res) => {
    //get the api an print it
    let url = "http://quotes.stormconsultancy.co.uk/random.json";
    request({
        url: url,
        json: true
    }, (error, response, body) => {
        if (error) {
            console.log("Unable to fetch citation");
        } else {
            console.log("author is : " + body.author);
            console.log("the user is : " + req.session.name);

            let dateDay = moment().locale("fr").format('LLLL');
            let author = body.author;
            let citation = body.quote;

            db.users.findOne({ where: { username: req.session.name } }).then(data => {

                res.render('dashboard', {
                    user: data.username,
                    dateDay: dateDay,
                    author: author,
                    citation: citation
                });
            })
        }
    })

});

/**============================
 * For logout
 ==============================*/
router.post('/dashboard', (req, res) => {
    res.render('dashboard');
});

/**============================
 * For logout
 ==============================*/
router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/sign_in');
});

module.exports = router;