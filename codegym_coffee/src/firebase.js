
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwVjOeETgFvC0Rquf-c-n6Jm6fxLweK9M",
  authDomain: "coffe-sprint1.firebaseapp.com",
  projectId: "coffe-sprint1",
  storageBucket: "coffe-sprint1.appspot.com",
  messagingSenderId: "435015407421",
  appId: "1:435015407421:web:3f4f26ea9a0dead1515754",
  measurementId: "G-2BGX4J3P69"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)