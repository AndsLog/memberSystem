(function() {
    const createError = require('http-errors');
    const express = require('express');
    const app = express();
    const path = require('path');
    const bodyParser = require('body-parser');
    const logger = require('morgan');
    const config = require('../config/config');
    const jwt = require('jsonwebtoken');

    const authMdl = require('../models/auth');

    const firebase = require('firebase-admin');
    const serviceAccount = require('../firebaseConfig.json');

    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
        databaseURL: 'https://membersystem-efdae.firebaseio.com'
    });


    app.set('secret', config.secret);

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(logger('dev'));

    function AuthController () {};

    AuthController.prototype.verify = function (req, res, next) {
        var token = req.headers['authorization'];
        return new Promise((resolve, reject) => {
            if (!token) {
                reject('No token provided.');
                return;
            }
            jwt.verify(token, app.get('secret'), function (err, decoded) {
                if (err) {
                    reject('Failed to authenticate token.');
                    return;
                }
                req.decoded = decoded;
                next();
            });
        }).catch((error) => {
            let resJson = {
                status: 0,
                msg: error
            };
            res.status(500).json(resJson);
        });
    }

    AuthController.prototype.signIn = function (req, res) {
        let email = req.body.email;
        let password = req.body.password;

        firebase.auth().signInWithEmailAndPassword(email, password).then((resJson) => {
            let payload = {
                uid: resJson.user.uid
            };
            let token = jwt.sign(payload, app.get('secret'));
            return token;
        }).then((token) => {
            let resJson = {
                status: 1,
                jwt: token,
                msg: 'success to signin'
            };
            res.status(200).json(resJson);
        }).catch((error) => {
            let resJson = {
                status: 0,
                msg: error
            };
            res.status(500).json(resJson);
        });
    }

    AuthController.prototype.signUp = function (req, res) {
        let email = req.body.email;
        let password = req.body.password;
        let user = {
            email: email,
            password: password
        };

        let insertUserData = {
            email: email,
            name: '',
            birthday: ''
        };
        firebase.auth().createUser(user).then((resJson) => {
            let userId = resJson.uid;
            return authMdl.insert(userId, insertUserData);
        }).then((resData) => {
            let userId = Object.keys(resData)[0];
            let payload = {
                uid: userId
            };
            let token = jwt.sign(payload, app.get('secret'));
            return token;
        }).then((token) => {
            let resJson = {
                status: 1,
                jwt: token,
                msg: 'success to signup'
            }
            res.status(200).json(resJson);
        }).catch((error) => {
            let resJson = {
                status: 0,
                msg: error
            }
            res.status(500).json(resJson);
        });
    }

    module.exports = new AuthController();
}());
