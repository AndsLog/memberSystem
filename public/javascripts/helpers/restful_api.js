
window.restfulAPI = (function () {
    var jwt = window.localStorage.getItem('jwt');
    var reqHeaders = new Headers();
    reqHeaders.set('Content-Type', 'application/json');

    var apiEndPoint = window.location.origin + '/api/auth/';

    // ======================
    // urlConfig undefined error handle
    !window.urlConfig && (window.urlConfig = {});
    !window.urlConfig.apiUrl && (window.urlConfig.apiUrl = window.location.origin); // 預設 website 與 api server 為同一網域
    // ======================

    /**
     * 設定 API 驗證身份所需的 JSON Web Token
     *
     * @param {string} value
     */
    var setJWT = function (value) {
        jwt = value;
        reqHeaders.set('Authorization', jwt);
    };

    jwt && setJWT(jwt);

    /**
     * @param {Response} res
     */
    var responseChecking = function (res) {
        if (!res.ok && res.status < 500) {
            return Promise.reject(new Error(res.status + ' ' + res.statusText));
        }

        if (!res.ok && res.status >= 500) {
            return res.json().then(function (resJson) {
                return Promise.reject(resJson);
            });
        }

        return res.json().then(function (resJson) {
            if (1 !== resJson.status) {
                return Promise.reject(resJson);
            }
            return resJson;
        });
    };

    /**
     * @param {RequestInfo} reqInfo
     * @param {RequestInit|RequestInit[]} reqInit
     */
    var sendRequest = function (reqInfo, reqInit) {
        return window.fetch(reqInfo, reqInit).then(function (res) {
            return responseChecking(res);
        });
    };
    var AuthAPI = (function () {
        function AuthAPI () {
            this.apiEndPoint = apiEndPoint;
        }

        AuthAPI.prototype.signIn = function (user) {
            let destUrl = this.apiEndPoint + 'signin/';
            let reqInit = {
                method: 'POST',
                headers: reqHeaders,
                body: JSON.stringify(user)
            };
            return sendRequest(destUrl, reqInit);
        }

        AuthAPI.prototype.signUp = function (user) {
            let destUrl = this.apiEndPoint + 'signup/';
            let reqInit = {
                method: 'POST',
                headers: reqHeaders,
                body: JSON.stringify(user)
            };
            return sendRequest(destUrl, reqInit);
        }
        return AuthAPI;
    }());

    var UserAPI = (function () {
        function UserAPI () {
            this.apiEndPoint = apiEndPoint;
        }

        UserAPI.prototype.find = function (userId) {
            let destUrl = this.apiEndPoint + 'user/' + userId;
            let reqInit = {
                method: 'GET',
                headers: reqHeaders
            };
            return sendRequest(destUrl, reqInit);
        }

        UserAPI.prototype.insert = function (userId, insertUser) {
            let destUrl = this.apiEndPoint + 'user/' + userId;
            let reqInit = {
                method: 'POST',
                headers: reqHeaders,
                body: JSON.stringify(insertUser)
            };
            return sendRequest(destUrl, reqInit);
        }

        UserAPI.prototype.remove = function (userId) {
            let destUrl = this.apiEndPoint + 'user/' + userId;
            let reqInit = {
                method: 'DELETE',
                headers: reqHeaders
            };
            return sendRequest(destUrl, reqInit);
        }

        return UserAPI;
    }());

    return {
        setJWT: setJWT,
        auth: new AuthAPI(),
        user: new UserAPI()
    };

})();

