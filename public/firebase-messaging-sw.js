importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js')

const firebaseConfig = {
    apiKey: "AIzaSyDohSvFlyf-DxbRKNo_sofoqGNKcUbD-Sg",
    authDomain: "live-chat-backup-server-28985.firebaseapp.com",
    databaseURL:
      "https://live-chat-backup-server-28985-default-rtdb.firebaseio.com",
    projectId: "live-chat-backup-server-28985",
    storageBucket: "live-chat-backup-server-28985.appspot.com",
    messagingSenderId: "204927114230",
    appId: "1:204927114230:web:0b8fefb98eb9b2d1b245d7",
  };

const app = firebase.initializeApp(firebaseConfig)