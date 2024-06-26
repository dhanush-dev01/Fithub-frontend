import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpiXZPoGrZ_FoONKSrJwDduGmA15z03MY",
  authDomain: "joghub-chat.firebaseapp.com",
  projectId: "joghub-chat",
  storageBucket: "joghub-chat.appspot.com",
  messagingSenderId: "882013764869",
  appId: "1:882013764869:web:159fa57b369f3cd7a74b6c"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()