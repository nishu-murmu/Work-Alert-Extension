// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDPUkeEzrKdrYmgoxrZQHcOuOxg5sUa3a4',
  authDomain: 'workalertextension-1c567.firebaseapp.com',
  projectId: 'workalertextension-1c567',
  storageBucket: 'workalertextension-1c567.appspot.com',
  messagingSenderId: '304843596099',
  appId: '1:304843596099:web:0e003ba91623d213f58ff6',
  measurementId: 'G-2DP0EFTT0E',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
// export const analytics = getAnalytics(app)
