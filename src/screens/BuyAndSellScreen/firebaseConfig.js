import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDDhbmBoYo4uDwJOgnrGWBGAPngCWq05fc",
  authDomain: "otp-generator-46a1d.firebaseapp.com",
  databaseURL: "https://otp-generator-46a1d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "otp-generator-46a1d",
  storageBucket: "otp-generator-46a1d.appspot.com",
  messagingSenderId: "952963487933",
  appId: "1:952963487933:web:96ab5b66a94143264d7fd4",
  measurementId: "G-G7RFS2ML0J"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };