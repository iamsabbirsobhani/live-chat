import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "@firebase/messaging";


// live server
// const firebaseConfig = {
//   apiKey: "AIzaSyDADPaaAvUiVhlvBZX_AidkXJZ90HTuZuc",
//   authDomain: "live-chat-31739.firebaseapp.com",
//   projectId: "live-chat-31739",
//   storageBucket: "live-chat-31739.appspot.com",
//   messagingSenderId: "286730120664",
//   appId: "1:286730120664:web:0579bb432f88a51efcd6ad",
// };
// live server

// live server backup
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
// live server backup

// live server backup 3
const firebaseConfig = {
  apiKey: "AIzaSyD03dqVZkEqPzaxd3ooaA4gLm5XnwiQZjY",
  authDomain: "live-chat-backup-3.firebaseapp.com",
  projectId: "live-chat-backup-3",
  storageBucket: "live-chat-backup-3.appspot.com",
  messagingSenderId: "924435072394",
  appId: "1:924435072394:web:f3c9237e637378e1723473",
  measurementId: "G-6BE3TBH2PT"
};
// live server backup 3


//init firebase
const app = firebase.initializeApp(firebaseConfig);

firebase.analytics(app);

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
  messaging,
};
