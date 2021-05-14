const express = require('express')
const userCtrl = require('../controllers/users');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/user/:id' , userCtrl.getOneUser)
router.post('/signup' , userCtrl.signup);
router.post('/signin' , userCtrl.signin);
router.post('/' , userCtrl.auth);

module.exports = router