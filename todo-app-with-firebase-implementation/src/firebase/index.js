// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD55TwCeQTd1kc25qAzDkOaTie9lhugSSA",
  authDomain: "todo-432a6.firebaseapp.com",
  projectId: "todo-432a6",
  storageBucket: "todo-432a6.appspot.com",
  messagingSenderId: "626905005707",
  appId: "1:626905005707:web:39d2b4873e1d4fcc8b9e8e",
};

initializeApp(firebaseConfig);

const db = getFirestore();

export {
  initializeApp,
  firebaseConfig,
  getAuth,
  where,
  createUserWithEmailAndPassword,
  updateProfile,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  addDoc,
  collection,
  db,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
};
