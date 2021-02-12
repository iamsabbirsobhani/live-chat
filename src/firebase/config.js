import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyCt9cLgwnll8G-ySlmzbHrSvYKHXXSQI68",
    authDomain: "vue-firebase-sites---learning.firebaseapp.com",
    projectId: "vue-firebase-sites---learning",
    storageBucket: "vue-firebase-sites---learning.appspot.com",
    messagingSenderId: "917486628068",
    appId: "1:917486628068:web:3ed7e95f51567860a710f1"
};

//init firebase
firebase.initializeApp(firebaseConfig)

const projectAuth = firebase.auth()

const projectFirebase = firebase.firestore()

const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectAuth, projectFirebase, timestamp}