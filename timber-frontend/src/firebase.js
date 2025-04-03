// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQB9nvO8vX2GsIcwxT2km6Bz7w9RgNDd0",
  authDomain: "timber-backend.firebaseapp.com",
  projectId: "timber-backend",
  storageBucket: "timber-backend.firebasestorage.app",
  messagingSenderId: "266185524468",
  appId: "1:266185524468:web:69adc343964f673a6f4aa1",
  measurementId: "G-JEP369H8NE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
