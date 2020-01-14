// import config from 'firebase-functions';
const admin = require('firebase-admin');

// firebase.initializeApp(config().firebase);

admin.initializeApp();
// app.use(cors({ origin: true }));

const db = admin.firestore();
// const settings = { timestampsInSnapshots: true }
// db.settings(settings)
module.exports.db = db