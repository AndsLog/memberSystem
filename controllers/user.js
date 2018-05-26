(function () {
    const userMdl = require('../models/user');

    function UserController () {};

    UserController.prototype.get = function (req, res) {
        let userId = req.params.userid || '';

        return userMdl.get(userId).then((resData) => {
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
            email: req.body.email
        };

        return userMdl.insert(userId, insertUser).then((resData) => {
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
