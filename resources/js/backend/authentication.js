import axios from "axios";
const createUser = function(userId, userName, phone, password) {
    return new Promise(function(resolve, reject) {
        axios.post('/healthcare/create_user', {
            UserID: userId,
            UserName: userName,
            Phone: phone,
            Password: password
        }).then(function(res) {
            resolve(res.data);
        }).catch(function (err) {
            console.log(err);
            reject(err);
        })

    });
}

const signIn = function(userId, password) {
    return new Promise(function(resolve, reject) {
        axios.post('/healthcare/sign_in', {
            UserID: userId,
            Password: password
        }).then(function(res) {
            resolve(res.data);
        }).catch(function(err) {
            reject(err);
        })
    });
}

const signOut = function() {
    return new Promise(function (resolve, reject) {
        axios.post('/healthcare/logout').then(function(res) {
            resolve();
        }).catch(function(err) {
            if(reject) reject();
        })
    })
};

const getUser = function () {
    return new Promise(function(resolve, reject) {
        axios.get('/healthcare/user').then(function(res) {
            resolve(res.data);
        }).catch(function (err) {
            reject(err);
        })
    });
}

export {createUser, signIn, getUser, signOut};
