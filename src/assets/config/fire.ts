import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCSmUH8lXUom932BBZ2dVzTMUlI78-6GM8",
    authDomain: "videos-9336f.firebaseapp.com",
    projectId: "videos-9336f",
    storageBucket: "videos-9336f.appspot.com",
    messagingSenderId: "751315854335",
    appId: "1:751315854335:web:82902dc100184efef47dca"
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);
export default fire;
