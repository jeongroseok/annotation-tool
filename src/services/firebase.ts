import "firebase/database";
import "firebase/storage";

import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD_z7dxoblCRlAFwlZvsnaEZ312z3Yf3ys",
  authDomain: "annotation-tool-d6529.firebaseapp.com",
  databaseURL: "https://annotation-tool-d6529-default-rtdb.firebaseio.com",
  projectId: "annotation-tool-d6529",
  storageBucket: "annotation-tool-d6529.appspot.com",
  messagingSenderId: "1044225945387",
  appId: "1:1044225945387:web:1775084f11a3d64d751f6e",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
