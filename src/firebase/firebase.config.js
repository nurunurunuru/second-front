import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBs6YL1ncffIghnso5RpXI22bCm5ibZhak",
  authDomain: "second-chance-shop-feba0.firebaseapp.com",
  projectId: "second-chance-shop-feba0",
  storageBucket: "second-chance-shop-feba0.firebasestorage.app",
  messagingSenderId: "198418327281",
  appId: "1:198418327281:web:ff6a19bc75608bc68e6b50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;