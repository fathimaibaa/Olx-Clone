import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';



const firebaseConfig = {
  apiKey: "AIzaSyDu_oOdcdu5yHTrwtudzwhh5E0YY9-GZ_s",
  authDomain: "fir-6a753.firebaseapp.com",
  projectId: "fir-6a753",
  storageBucket: "fir-6a753.appspot.com",
  messagingSenderId: "860419991335",
  appId: "1:860419991335:web:d01be135cb8203bcf2eb02",
  measurementId: "G-RRDYR3P9KB"
};



export default firebase.initializeApp(firebaseConfig)
