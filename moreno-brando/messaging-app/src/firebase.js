import firebase from "firebase";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCNgCl0xCXX0_O5Y3UQJn170p7tdZldHs8",
    authDomain: "challonge-api-app.firebaseapp.com",
    projectId: "challonge-api-app",
    storageBucket: "challonge-api-app.appspot.com",
    messagingSenderId: "1061601982728",
    appId: "1:1061601982728:web:84770102c66bc5dc4314bd",
    measurementId: "G-BM22SSHRRM"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();


export { db, auth };