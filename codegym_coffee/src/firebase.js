import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCe8-IJKGUd-yXoYR0xQKMdSuIv5YsznDE",
    authDomain: "codegym-coffee-be0db.firebaseapp.com",
    projectId: "codegym-coffee-be0db",
    storageBucket: "codegym-coffee-be0db.appspot.com",
    messagingSenderId: "832032829361",
    appId: "1:832032829361:web:f2079f619d4aad32ae9790",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
//
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyBMysYKrxkveVZ74ZecHwxWEvOfyTq6atc",
//     authDomain: "codegym-coffee.firebaseapp.com",
//     projectId: "codegym-coffee",
//     storageBucket: "codegym-coffee.appspot.com",
//     messagingSenderId: "1052077003816",
//     appId: "1:1052077003816:web:7bae1c1c5fd0b5efea911d",
//     measurementId: "G-QYVNWR2STF"
// };
//
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);