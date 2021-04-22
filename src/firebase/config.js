import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'



const firebaseConfig = {
    apiKey: "AIzaSyDADPaaAvUiVhlvBZX_AidkXJZ90HTuZuc",
    authDomain: "live-chat-31739.firebaseapp.com",
    projectId: "live-chat-31739",
    storageBucket: "live-chat-31739.appspot.com",
    messagingSenderId: "286730120664",
    appId: "1:286730120664:web:0579bb432f88a51efcd6ad"
  };

//init firebase
firebase.initializeApp(firebaseConfig)

const projectAuth = firebase.auth()

const projectFirebase = firebase.firestore()

const projectFirestore = firebase.firestore()

const projectStorage = firebase.storage()

const timestamp = firebase.firestore.FieldValue.serverTimestamp

export {
    projectAuth,
    projectFirebase,
    timestamp,
    projectFirestore,
    projectStorage
}