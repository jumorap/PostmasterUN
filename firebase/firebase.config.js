import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"
import "firebase/compat/firestore"
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
import { getFirestore, initializeFirestore, setLogLevel } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBjHn702pSf-nHhgeoBB88U0aXfvwQ5zVc",
    authDomain: "postmaster-un.firebaseapp.com",
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId,
    databaseURL: process.env.REACT_APP_databaseURL,
}


// Initialize firebaseSelf
export const firebaseInitApp = initializeApp(firebaseConfig)


// Auth factor
export const firebaseAppAuth = getAuth();
const provider = new GoogleAuthProvider();
export const firebaseLogin = () => {
    signInWithPopup(firebaseAppAuth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
    });
}
export const providers = {
    googleProvider: provider,
};


// DB firestorage
export const db = initializeFirestore(firebaseInitApp, {
    experimentalForceLongPolling: true,
})
export const storage = getStorage()
