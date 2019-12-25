import firebase from 'firebase/app';
import 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCuceBF7Bpmx0hg4bTCM4IyvzT7P9vHQ-0",
    authDomain: "ecommerce-5c0af.firebaseapp.com",
    databaseURL: "https://ecommerce-5c0af.firebaseio.com",
    projectId: "ecommerce-5c0af",
    storageBucket: "ecommerce-5c0af.appspot.com",
    messagingSenderId: "331976069638",
    appId: "1:331976069638:web:6c7183d2d8d9345b536987",
    measurementId: "G-625HXRL01X"
  };
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}