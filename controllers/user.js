(function () {
    const userMdl = require('../models/user');

    function UserController () {};

    UserController.prototype.get = function (req, res) {
        let userId = req.params.userid || '';

        return userMdl.find(userId).then((resData) => {
            if (!resData) {
                Promise.reject('user fail to find');
            }
            let resJson = {
                status: 1,
                data: resData,
                msg: 'user success to find'
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

    UserController.prototype.postOne = function (req, res) {
        let userId = req.params.userid;
        let insertUser = {
            name: req.body.name,
            birthday: req.body.birthday,
            email: req.body.email,
            role: 0
        };

        return userMdl.insert(userId, insertUser).then((resData) => {
            if (!resData) {
                Promise.reject('user fail to insert');
            }
            let resJson = {
                status: 1,
                data: resData,
                msg: 'user success to insert'
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

    UserController.prototype.deleteOne = function (req, res) {
        let userId = req.params.userid;

        return userMdl.delete(userId).then((resData) => {
            if (!resData) {
                Promise.reject('user fail to delete');
            }
            let resJson = {
                status: 1,
                data: resData,
                msg: 'user success to delete'
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
    module.exports = new UserController();
}());
