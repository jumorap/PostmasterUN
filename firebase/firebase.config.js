import firebase from "firebase/app"
import "firebase/storage"
import "firebase/firestore"
import "firebase/auth"


var firebaseConfig = {
    apiKey: "AIzaSyBjHn702pSf-nHhgeoBB88U0aXfvwQ5zVc",
    authDomain: "postmaster-un.firebaseapp.com",
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId,
};


export let firebaseInitApp;

// Initialize firebaseSelf
if (!firebase.apps.length) firebaseInitApp = firebase.initializeApp(firebaseConfig);
// if already initialized, use that one
else firebaseInitApp = firebase.app();


// Auth factor
export const firebaseAppAuth = firebaseInitApp.auth();
export const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
};


// DB firestorage
export const db = firebase.firestore();
export const storage = firebase.storage();
