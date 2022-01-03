import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import '@firebase/messaging';
// const firebaseConfig = {
//   apiKey: "AIzaSyDohSvFlyf-DxbRKNo_sofoqGNKcUbD-Sg",
//   authDomain: "live-chat-backup-server-28985.firebaseapp.com",
//   databaseURL:
//     "https://live-chat-backup-server-28985-default-rtdb.firebaseio.com",
//   projectId: "live-chat-backup-server-28985",
//   storageBucket: "live-chat-backup-server-28985.appspot.com",
//   messagingSenderId: "204927114230",
//   appId: "1:204927114230:web:0b8fefb98eb9b2d1b245d7",
//   measurementId: "G-Z948DMVF26"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDADPaaAvUiVhlvBZX_AidkXJZ90HTuZuc",
  authDomain: "live-chat-31739.firebaseapp.com",
  projectId: "live-chat-31739",
  storageBucket: "live-chat-31739.appspot.com",
  messagingSenderId: "286730120664",
  appId: "1:286730120664:web:0579bb432f88a51efcd6ad"
};
//init firebase
const app = firebase.initializeApp(firebaseConfig);

firebase.analytics(app)

const projectAuth = firebase.auth();

const projectFirebase = firebase.firestore();

const projectFirestore = firebase.firestore();

const projectStorage = firebase.storage();

const messaging = firebase.messaging();



const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {
  projectAuth,
  projectFirebase,
  timestamp,
  projectFirestore,
  projectStorage,
  messaging
};
