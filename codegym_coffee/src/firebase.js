
import { initializeApp } from "firebase/app";
import { getStorage } from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7WgM2NTbDLJ01lLG6tMqcuXrdNoA6Jws",
  authDomain: "uploadfirebase-70372.firebaseapp.com",
  projectId: "uploadfirebase-70372",
  storageBucket: "uploadfirebase-70372.appspot.com",
  messagingSenderId: "356727314809",
  appId: "1:356727314809:web:4757227e7ef0e58dd237a8",
  measurementId: "G-RQJ83KV33W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)