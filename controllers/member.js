(function () {
    const memberMdl = require('../models/member');

    function MemberController () {};

    MemberController.prototype.get = function (req, res) {
        let userId = req.params.userid || '';

        return memberMdl.get(userId).then((resData) => {
            let resJson = {
                status: 1,
                data: resData,
                msg: 'member success to find'
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

    MemberController.prototype.postOne = function (req, res) {
        let userId = req.params.userid;
        let insertMember = {
            name: req.body.name,
            birthday: req.body.birthday,
            e_mail: req.body.e_mail,
            user_id: req.body.user_id
        };

        return memberMdl.insert(userId, insertMember).then((resData) => {
            let resJson = {
                status: 1,
                data: resData,
                msg: 'member success to insert'
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

    MemberController.prototype.deleteOne = function (req, res) {
        let userId = req.params.userid;

        return memberMdl.delete(userId).then((resData) => {
            let resJson = {
                status: 1,
                data: resData,
                msg: 'member success to delete'
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
    module.exports = new MemberController();
}());
