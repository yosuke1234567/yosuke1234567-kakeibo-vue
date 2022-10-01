import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyAz9B6sPZlvSmtxAxNNOmV694-UdeGkvwk",
    authDomain: "kakeibo-59bc5.firebaseapp.com",
    projectId: "kakeibo-59bc5",
    storageBucket: "kakeibo-59bc5.appspot.com",
    messagingSenderId: "712467410663",
    appId: "1:712467410663:web:d1460e755be8c77a683c42"
})

const auth = getAuth(firebaseApp)

const db = getFirestore(firebaseApp)

export { auth, db }