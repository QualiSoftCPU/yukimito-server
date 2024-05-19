const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

module.exports = firebaseConfig;

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDOzjApSgaFs65BEuxNmzzxWvEDbWEbhSY",
//   authDomain: "yukimito-db.firebaseapp.com",
//   projectId: "yukimito-db",
//   storageBucket: "yukimito-db.appspot.com",
//   messagingSenderId: "405936708035",
//   appId: "1:405936708035:web:494a0d16e50f8f83c7c576",
//   measurementId: "G-MGSTPYSGZL"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);