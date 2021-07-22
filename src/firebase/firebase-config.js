import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';




  const firebaseConfig = {
    apiKey: "AIzaSyAIap1BmQ0G1efpsb80wmFkkOFHsszn9tM",
    authDomain: "react-app-cursos-5460d.firebaseapp.com",
    databaseURL: "https://react-app-cursos-5460d.firebaseio.com",
    projectId: "react-app-cursos-5460d",
    storageBucket: "react-app-cursos-5460d.appspot.com",
    messagingSenderId: "871485082862",
    appId: "1:871485082862:web:d3553806a3310e4b30f7ff"
  };


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }