const express = require('express');
const router = express.Router();

const authCtl = require('../controllers/auth');
const userCtl = require('../controllers/user');

router.post('/auth/signin', authCtl.signIn);
router.post('/auth/signup', authCtl.signUp);

router.use(authCtl.verify);

router.get('/auth/user/', userCtl.get);
router.get('/auth/user/:userid', userCtl.get);
router.post('/auth/user/:userid', userCtl.postOne);
router.delete('/auth/user/:userid', userCtl.deleteOne);

module.exports = router;
