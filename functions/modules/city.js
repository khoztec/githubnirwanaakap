const functions = require('firebase-functions')
const express = require('express');
const cors = require('cors');
var firebaseAdmin = require("firebase-admin");

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
    firebase.auth().verifyIdToken(idToken).then(decodedIdToken => {
        console.log('ID Token correctly decoded', decodedIdToken);
        req.user = decodedIdToken;
        return next();
    }).catch(error => {
        console.error('Error while verifying Firebase ID token:', error);
        res.status(403).send('Unauthorized');
    });
};

// const {validateFirebaseIdToken} = require('../middleware.js')

const app = express();
// const admin = require('firebase-admin');

// admin.initializeApp();
const {db} = require('../store.js')


// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
// app.use(validateFirebaseIdToken)
// Add middleware to authenticate requests
// app.use(myMiddleware);
// app.use(validateFirebaseIdToken);


// build multiple CRUD interfaces:
app.get('/:id', (req, res) => 
    db.collection('visi').doc(req.params.id).get().then((doc)=>{
        res.send(doc.data().nama_visi)
    }).catch((error)=>{
        res.status(403).send(error)
    })
);
// app.post('/', (req, res) => res.send(Widgets.create()));
// app.put('/:id', (req, res) => res.send(Widgets.update(req.params.id, req.body)));
// app.delete('/:id', (req, res) => res.send(Widgets.delete(req.params.id)));
app.get('/', ((req, res) => {
    var data = []
    db.collection('visi').get().then((query)=>{
        query.forEach((doc) => {
            data.push({
                id : doc.id,
                nama: doc.data().nama_visi
            })
        })
    }).then(()=>{
        res.send(data)
    }).catch((error)=>{
        res.send(error)
    })
    
}));

// Expose Express API as a single Cloud Function:
module.exports = functions.https.onRequest(app)