const express = require('express');
const router = express.Router();

const authCtl = require('../controllers/auth');
const memberCtl = require('../controllers/member');

router.post('/auth/signin', authCtl.signIn);
router.post('/auth/signup', authCtl.signUp);

router.use(authCtl.verify);

router.get('/auth/member/',memberCtl.get);
router.get('/auth/member/:userid',memberCtl.get);
router.post('/auth/member/:userid', memberCtl.postOne);
router.delete('/auth/member/:userid', memberCtl.deleteOne);


module.exports = router;
