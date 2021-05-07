const express = require('express')
const userCtrl = require('../controllers/users')

const router = express.Router();

router.post('/signup' , userCtrl.signup);
router.post('/signin' , userCtrl.signin);

module.exports = router