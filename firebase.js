import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFTBh-5U2afFoZS02S4GMr1nCSRdt8i9M",
  authDomain: "signal-clone-e0cb7.firebaseapp.com",
  projectId: "signal-clone-e0cb7",
  storageBucket: "signal-clone-e0cb7.appspot.com",
  messagingSenderId: "1082778435921",
  appId: "1:1082778435921:web:c52af967e0d5f815349370",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
export { db, auth };
