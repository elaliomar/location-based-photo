// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';
import firebase from 'firebase/compat/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDsYvqDy3UoGhEK2h-_wK59eRsmeA1X9hI',
  authDomain: 'image-storage-c6842.firebaseapp.com',
  projectId: 'image-storage-c6842',
  storageBucket: 'image-storage-c6842.appspot.com',
  messagingSenderId: '413585450287',
  appId: '1:413585450287:web:32cbd3d8124ee445dbedda',
  measurementId: 'G-BPPN21MWGR',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export {firebase};
