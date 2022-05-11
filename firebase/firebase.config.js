import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"
import "firebase/compat/firestore"
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
import { getFirestore, initializeFirestore, setLogLevel } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DATABASEURL,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID
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
export const db = getFirestore()
export const storage = getStorage()
