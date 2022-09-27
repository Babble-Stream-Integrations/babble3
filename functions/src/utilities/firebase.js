import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

// Get config
import { firebaseConfig } from '../config/firebase.js';

// Export
export const firebase = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebase);
