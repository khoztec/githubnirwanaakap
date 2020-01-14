import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/storage'

var config = {
  apiKey: "AIzaSyDzfoJ5VmvbGeyu1sR_m6CGZFKagw8vQMo",
  authDomain: "nirwana-1d742.firebaseapp.com",
  databaseURL: "https://nirwana-1d742.firebaseio.com",
  projectId: "nirwana-1d742",
  storageBucket: "nirwana-1d742.appspot.com",
  messagingSenderId: "973606528241"
}

// var config = {
//   apiKey: "AIzaSyAwnLBD9tXdUhuogtXE543k62buPD6HdSk",
//   authDomain: "sekolah-74c42.firebaseapp.com",
//   databaseURL: "https://sekolah-74c42.firebaseio.com",
//   projectId: "sekolah-74c42",
//   storageBucket: "sekolah-74c42.appspot.com",
//   messagingSenderId: "493725068859"
// };

!firebase.apps.length ? firebase.initializeApp(config) : ''
export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
// export const emailPassword = new firebase.auth.createUserWithEmailAndPassword();
// export const auth = firebase.auth();
// export const DB = firebase.database();
export default firebase
const settings = { timestampsInSnapshots: true }

export var auth = firebase.auth(),
  auth2 = firebase.auth(),
  DB = firebase.database(),
  db2 = firebase.firestore(),
  storage = firebase.storage(),
  storageRef = firebase.storage().ref(),
  timetes = firebase.firestore.FieldValue.serverTimestamp()