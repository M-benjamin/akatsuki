const express = require('express');
const router = express.Router();
const moment = require('moment');
const path = require('path');

const db = require('../database/init');

/**============================
 * Get Profile page
 ==============================*/
router.get('/:name', (req, res) => {

    let name = req.params.name;

    console.log("the name is :" + name);

    db.users.findOne({ where: { username: name } }).then(data => {
        let dateB = moment(data.birthday).locale("fr").format('LLLL');
        res.render('profil', {
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            birthday: dateB
        });
    })
});

/**============================
 * Update Profile
 ==============================*/
router.put('/:name', (req, res) => {
    res.render('profil');
});

/**============================
 * Delete Profile
 ==============================*/
router.delete('/:name', (req, res) => {
    res.render('profil');
});

/**============================
 * Get Update profile page
 * PAGE UPDATE NOT FINISH
 ==============================*/
router.get('/:name/update', (req, res) => {
    let name = req.params.name;
    console.log("my name is : " + name);
    db.users.findOne({ where: { username: name } }).then(data => {
        res.render('update', {
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            birthday: data.birthday
        });
    })
});

/**=======================================================
 * Get Module page AND insert data from json into database
 =========================================================*/
router.get('/:name/module', (req, res) => {
    console.log(__dirname);
    let mod = require(path.join(__dirname, '../data/module.json'));


    mod.modules.forEach(function(m) {
        console.log(m);
        // db.users.create(m).then(moduleU => {

        // }).catch(error => {
        //     console.log(error);
        // });
    });

    res.render('list');


});



module.exports = router;