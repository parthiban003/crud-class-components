import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhOd7SsGbzE50FzLcGxYbVqtF8QJi1V4A",
  authDomain: "crud-in-class.firebaseapp.com",
  projectId: "crud-in-class",
  storageBucket: "crud-in-class.firebasestorage.app",
  messagingSenderId: "223400579579",
  appId: "1:223400579579:web:e4f08dce7785de770cbb5e",
  measurementId: "G-YNW14F1BT6"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
