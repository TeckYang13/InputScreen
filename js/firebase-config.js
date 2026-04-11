/* ══════════════════════════════════════
   FIREBASE CONFIG
   Fill in your project values below
══════════════════════════════════════ */
const firebaseConfig = {
  apiKey: "AIzaSyAcPpmVOa8rFuotN2F4NThczkjhILEtGJo",
  authDomain: "inputscreen-e4233.firebaseapp.com",
  databaseURL: "https://inputscreen-e4233-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "inputscreen-e4233",
  storageBucket: "inputscreen-e4233.firebasestorage.app",
  messagingSenderId: "37978215395",
  appId: "1:37978215395:web:e154e31e33ba89887f06d6"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
