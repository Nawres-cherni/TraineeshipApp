// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXvS-cUDNmD0h2betfplMSIyMTZb9GVb4",
  authDomain: "mobile-12b08.firebaseapp.com",
  projectId: "mobile-12b08",
  storageBucket: "mobile-12b08.appspot.com",
  messagingSenderId: "942531933715",
  appId: "1:942531933715:web:a581d030a35e2d0a94b1e6"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0){
  app=  firebase.initializeApp(firebaseConfig)
  }
  else{
     app= firebase.app()
  }
  const auth = firebase.auth()
export{ auth };
//const analytics = getAnalytics(app);