import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  authDomain: "denguexx-415c0.firebaseapp.com",
  databaseURL: "https://denguexx-415c0.firebaseio.com",
  projectId: "denguexx-415c0",
  storageBucket: "denguexx-415c0.appspot.com",
  messagingSenderId: "427693098534",
  appId: "1:427693098534:web:f16483f7ba1f5dbfed08e7",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
