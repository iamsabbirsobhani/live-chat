importScripts("https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js");
// live server
// const firebaseConfig = {
//   apiKey: "AIzaSyDohSvFlyf-DxbRKNo_sofoqGNKcUbD-Sg",
//   authDomain: "live-chat-backup-server-28985.firebaseapp.com",
//   databaseURL:
//     "https://live-chat-backup-server-28985-default-rtdb.firebaseio.com",
//   projectId: "live-chat-backup-server-28985",
//   storageBucket: "live-chat-backup-server-28985.appspot.com",
//   messagingSenderId: "204927114230",
//   appId: "1:204927114230:web:0b8fefb98eb9b2d1b245d7",
// };
// live server
// live server backup
const firebaseConfig = {
  apiKey: "AIzaSyDADPaaAvUiVhlvBZX_AidkXJZ90HTuZuc",
  authDomain: "live-chat-31739.firebaseapp.com",
  projectId: "live-chat-31739",
  storageBucket: "live-chat-31739.appspot.com",
  messagingSenderId: "286730120664",
  appId: "1:286730120664:web:0579bb432f88a51efcd6ad",
};
// live server backup

const app = firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging(); // for receiving data from server & notification style as well

//   messaging.onMessageReceived(function(payload) {
//     console.log('Received background message ', payload);

//     const notificationTitle = payload;
//     const notificationOptions = {
//       body: payload,
//     };

//     self.registration.showNotification(notificationTitle,
//       notificationOptions);
//   });
