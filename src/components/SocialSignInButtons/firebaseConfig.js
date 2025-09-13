import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAEO9dn4dz3FS0NcpVomk1LWaEEFLi0qWs",
  authDomain: "otp-test-c712f.firebaseapp.com",
  projectId: "otp-test-c712f",
  storageBucket: "otp-test-c712f.appspot.com",
  messagingSenderId: "772556767721",
  appId: "1:772556767721:web:b7021ff4bf313dc29acb78",
  measurementId: "G-TSBNWJNGHM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);