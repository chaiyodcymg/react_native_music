

import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBqdFA00KuOF-3IZSB0V3KgRsW0t8NuY1E",
    authDomain: "react-music-b727c.firebaseapp.com",
    databaseURL: "https://react-music-b727c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "react-music-b727c",
    storageBucket: "react-music-b727c.appspot.com",
    messagingSenderId: "76095914634",
    appId: "1:76095914634:web:937bb379fa5f6913fa2373",
    measurementId: "G-SV7GSPD4NT"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
// export const authen = app.auth;
export default app;
export const auth = getAuth(app);
// export const si111se);


