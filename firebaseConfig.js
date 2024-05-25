import firebase from 'firebase/compat/app';
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAuLfXQF3BglQroRpNXLpmel9PLsqLf7wA",
  authDomain: "health-care-9c97f.firebaseapp.com",
  projectId: "health-care-9c97f",
  storageBucket: "health-care-9c97f.appspot.com",
  messagingSenderId: "94523324841",
  appId: "1:94523324841:android:a5ebd97e5b8b43b6866cb8"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();

export {firebase,storage };
