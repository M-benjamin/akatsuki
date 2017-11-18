const express = require('express');
const router = express.Router();


const db = require('../database/init');

/**============================
 * Get Profile page
 ==============================*/
router.get('/:name', (req, res) => {
    res.render('profil');
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
 ==============================*/
router.get('/:name/update', (req, res) => {
    res.render('update');
});

/**============================
 * Get Module page
 ==============================*/
router.get('/:name/module', (req, res) => {
    res.render('list');
});



module.exports = router;