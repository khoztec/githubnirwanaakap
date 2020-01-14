"use strict";

var _firebaseFunctions = require("firebase-functions");

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _store = require("../store");

var _store2 = _interopRequireDefault(_store);

var _firebaseAdmin = require("firebase-admin");

var _firebaseAdmin2 = _interopRequireDefault(_firebaseAdmin);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var moment = require("@nuxtjs/moment")
// const cors = require('cors');
const cors = require('cors')({ origin: true });
// const express = require('express');
const cookieParser = require('cookie-parser')();
const users = (0, _express2.default)();

const validateFirebaseIdToken = (req, res, next) => {
    console.log('Check if request is authorized with Firebase ID token');

    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) && !(req.cookies && req.cookies.__session)) {
        console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.', 'Make sure you authorize your request by providing the following HTTP header:', 'Authorization: Bearer <Firebase ID Token>', 'or by passing a "__session" cookie.');
        res.status(403).send('Unauthorized');
        return;
    }

    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        console.log('Found "Authorization" header');
        // Read the ID Token from the Authorization header.
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else if (req.cookies) {
        console.log('Found "__session" cookie');
        // Read the ID Token from cookie.
        idToken = req.cookies.__session;
    } else {
        // No cookie
        res.status(403).send('Unauthorized');
        return;
    }
    _firebaseAdmin2.default.auth().verifyIdToken(idToken).then(decodedIdToken => {
        console.log('ID Token correctly decoded', decodedIdToken);
        req.user = decodedIdToken;
        return next();
    }).catch(error => {
        console.error('Error while verifying Firebase ID token:', error);
        res.status(403).send('Unauthorized');
    });
};

users.use(cors);
users.use(cookieParser);
users.use(validateFirebaseIdToken);

users.get('/cek', (req, res) => {

    res.send('ini users ');
});

users.get('/buat', (req, res) => {

    _firebaseAdmin2.default.auth().createUser({
        email: "user@example.com",
        emailVerified: false,
        phoneNumber: "+11234567890",
        password: "secretPassword",
        displayName: "John Doe",
        photoURL: "http://www.example.com/12345678/photo.png",
        disabled: false
    }).then(function (userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully created new user:", userRecord.uid);
    }).catch(function (error) {
        console.log("Error creating new user:", error);
    });
});

users.post('/', (req, res) => {

    _firebaseAdmin2.default.auth().createUser({
        uid: req.body.id,
        displayName: req.body.nama_users,
        email: req.body.email,
        password: req.body.password,
    }).then(function () {
        res.send("Successfully save user");
    }).catch(function (error) {

        console.log("Error deleting user:", error);
    });

});

users.delete('/', function (req, res) {

    _firebaseAdmin2.default.auth().deleteUser(req.body.id).then(function () {
        res.send("Successfully deleted user");
    }).catch(function (error) {
        console.log("Error deleting user:", error);
    });

});

users.put('/', function (req, res) {
    var id = req.body.id_users;
    var password = req.body.password;

    var item = {
        'nama_users': req.body.nama_users,
        'email': req.body.email,
        'role': req.body.role
    };

    _store2.default.collection("users").doc(id).update(item).then(function (userRecord) {

        if (password != null) {
            _firebaseAdmin2.default.auth().updateUser(id, {
                email: req.body.email,
                password: req.body.password
            });
        }
    }).then(function (userRecord) {
        res.send(userRecord.id);
    }).catch(function (error) {
        res.send(error);
    });
});

module.exports =  _firebaseFunctions.https.onRequest(users);