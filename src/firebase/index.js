// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

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


// AUTH


/*firebaseAuth.onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        console.log('user signed in : ', user);
        var docRef = db.collection("users").doc(uid);

        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        //writeUserData('eop5emva3sfKnewQdYuIXvZ99G13', 'Paco', 'email@email.com', 'img.jpg');
    } else {
        console.log('user signed out')
      // User is signed out.
      // ...
    }
});*/