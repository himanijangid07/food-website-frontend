 // Import the functions you need from the SDKs you need
 import { initializeApp } from "firebase/app";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 
 // console.log(import.meta.env.VITE_SOME_KEY)
 
 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyDWwk3LXtcfFMFQ9lEWgg_tItUnZyF_vxo",
   authDomain: "foody-15aff.firebaseapp.com",
   projectId: "foody-15aff",
   storageBucket: "foody-15aff.appspot.com",
   messagingSenderId: "913085533418",
   appId: "1:913085533418:web:6c99616787da4d4367db93"
 };
 
 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 
 export default app; 