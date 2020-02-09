// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

import { authState } from 'rxfire/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAxWW2y0XLnQ44RVpuFf9UsyjDsnvTuyCI",
    authDomain: "banking-rxjs.firebaseapp.com",
    databaseURL: "https://banking-rxjs.firebaseio.com",
    projectId: "banking-rxjs",
    storageBucket: "banking-rxjs.appspot.com",
    messagingSenderId: "318535495859",
    appId: "1:318535495859:web:ef5e5e77e37cc1f64080c6",
    measurementId: "G-QWLTW1CKNZ"
};


try {
    firebase.initializeApp(firebaseConfig);
    //firebase.analytics();
} catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack)
    }
}

// DATABASE
export const db = firebase.firestore();
export const firebaseAuth = firebase.auth();


// AUTh
export const authObservable$ = authState(firebaseAuth);