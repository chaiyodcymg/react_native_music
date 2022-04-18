

import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBvTljcaZVwXROeCFa9tJ2UjWSb089H6bE",
    authDomain: "react-music-b52e8.firebaseapp.com",
    databaseURL: "https://react-music-b52e8-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "react-music-b52e8",
    storageBucket: "react-music-b52e8.appspot.com",
    messagingSenderId: "699314975534",
    appId: "1:699314975534:web:068951cb822f36076a40bf",
    measurementId: "G-YSJJ8623SM"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
// export const authen = app.auth;
export default app;
export const auth = getAuth(app);
// export const si111se);


