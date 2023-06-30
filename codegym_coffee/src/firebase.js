// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCXDQZg4GfKvc3RpwXBxA-A-TfQqfdUaU8",
    authDomain: "quynhhtn.firebaseapp.com",
    projectId: "quynhhtn",
    storageBucket: "quynhhtn.appspot.com",
    messagingSenderId: "685783384385",
    appId: "1:685783384385:web:dc6bcc0e51a880bff0e1c0",
    measurementId: "G-NMKH5SDRTY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

// // Import the functions you need from the SDKs you need
//
// import {initializeApp} from "firebase/app";
// import {getAnalytics} from "firebase/analytics";
// import {getStorage} from "firebase/storage";
//
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
//
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//
// const firebaseConfig = {
//     apiKey: "AIzaSyCmATaMlf9f5wZ-I8UpKRyR-OIdk73Y0nM",
//     authDomain: "fir-firebase-206c9.firebaseapp.com",
//     databaseURL: "https://fir-firebase-206c9-default-rtdb.firebaseio.com",
//     projectId: "fir-firebase-206c9",
//     storageBucket: "fir-firebase-206c9.appspot.com",
//     messagingSenderId: "9466670608",
//     appId: "1:9466670608:web:ff65eb50d35b8359a3e495",
//     measurementId: "G-GBJBGXBNJY"
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
//
// const analytics = getAnalytics(app);
// export const storage = getStorage(app)