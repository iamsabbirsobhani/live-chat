import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyDohSvFlyf-DxbRKNo_sofoqGNKcUbD-Sg",
  authDomain: "live-chat-backup-server-28985.firebaseapp.com",
  projectId: "live-chat-backup-server-28985",
  storageBucket: "live-chat-backup-server-28985.appspot.com",
  messagingSenderId: "204927114230",
  appId: "1:204927114230:web:0b8fefb98eb9b2d1b245d7"
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