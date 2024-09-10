import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Конфигурации Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDOJjRzA6gtIb6ob0NYZN6VCQUW92G53W8",
  authDomain: "insurance-company-crm-e67fc.firebaseapp.com",
  projectId: "insurance-company-crm-e67fc",
  storageBucket: "insurance-company-crm-e67fc.appspot.com",
  messagingSenderId: "99676248326",
  appId: "1:99676248326:web:f85885fb4e5eb89be32687",
  measurementId: "G-W0624CPJ28"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
