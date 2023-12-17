// Import the functions you need from the SDKs you need
import {getAuth} from 'firebase/auth'
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDF7AUMUSGLkoy6AfS1Qpgo1A6dK0kPxm8",
  authDomain: "gifvortex-backie.firebaseapp.com",
  projectId: "gifvortex-backie",
  storageBucket: "gifvortex-backie.appspot.com",
  messagingSenderId: "920812542608",
  appId: "1:920812542608:web:0075cc13fb29aef5fcd615",
  measurementId: "G-3S8NTKC3RF"
};

// Initializing Firebase
let firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(firebaseApp)
export default firebaseApp
export {auth}