importScripts("https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.7.0/firebase-messaging.js");

var firebaseConfig = {
    apiKey: "AIzaSyAT0FXehYNWoWWSiQwtWVblE4fj9Zja52Q",
    authDomain: "scoutbase-31e56.firebaseapp.com",
    databaseURL: "https://scoutbase-31e56.firebaseio.com",
    projectId: "scoutbase-31e56",
    storageBucket: "scoutbase-31e56.appspot.com",
    messagingSenderId: "9278278062",
    appId: "1:9278278062:web:38867501c5a9f5dc00a03f",
    measurementId: "G-QH6PZZ8KNW"
};

firebase.initializeApp(firebaseConfig);

const notifier = firebase.messaging();