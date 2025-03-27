// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsYZlO6IJeDrCCaSw01_wT6VeY1JahgEY",
  authDomain: "musicvest-mvp.firebaseapp.com",
  projectId: "musicvest-mvp",
  storageBucket: "musicvest-mvp.firebasestorage.app",
  messagingSenderId: "393138947374",
  appId: "1:393138947374:web:eb0dc976927688db4ba6bf",
  measurementId: "G-XGXBZXT3KQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;