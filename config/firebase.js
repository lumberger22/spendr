// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZv45ksNAdfe2Ab8uizHyla08zqSihH0Y",
  authDomain: "tripmate-da11c.firebaseapp.com",
  projectId: "tripmate-da11c",
  storageBucket: "tripmate-da11c.appspot.com",
  messagingSenderId: "466782090041",
  appId: "1:466782090041:web:1b8e7f00218afad590aee8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


export const tripsRef = collection(db, "trips");
export const expensesRef = collection(db, "expenses");

export default app;