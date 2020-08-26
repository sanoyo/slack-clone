import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var config = {
  apiKey: "AIzaSyBDniPVN8j4BMbyUFu7pTrGef48KrtQG9I",
  authDomain: "slack-clone-e040b.firebaseapp.com",
  databaseURL: "https://slack-clone-e040b.firebaseio.com",
  projectId: "slack-clone-e040b",
  storageBucket: "slack-clone-e040b.appspot.com",
  messagingSenderId: "433469061111",
  appId: "1:433469061111:web:ab166522e94b59576fa0f2",
  measurementId: "G-R6EQ1V83Z7"
};
// Initialize Firebase
firebase.initializeApp(config);
firebase.analytics();

export default firebase;