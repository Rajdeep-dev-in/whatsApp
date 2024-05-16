// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZk-R18SUmtGSpfxeJSj3tgR2IT2r32tM",
    authDomain: "whatsapp-clone-77d5a.firebaseapp.com",
    projectId: "whatsapp-clone-77d5a",
    storageBucket: "whatsapp-clone-77d5a.appspot.com",
    messagingSenderId: "63745999211",
    appId: "1:63745999211:web:65a3d47667edc402d28c2e"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)

  export { db }