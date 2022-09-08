import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import * as firebase from "firebase"



const firebaseConfig = {
    apiKey: "AIzaSyCo-dK5TBAIAvh1o5HBcfWxjoDJBWRvL1I",
    authDomain: "resk-eda1a.firebaseapp.com",
    projectId: "resk-eda1a",
    storageBucket: "resk-eda1a.appspot.com",
    messagingSenderId: "277770738043",
    appId: "1:277770738043:web:bb1bdca9e852f19ef845de",
    measurementId: "G-2NKPYGDH8J"
};


let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)

}
else {
    app = firebase.app()

}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth }