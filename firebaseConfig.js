import { getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCv-NV0p8JX2o2qzuyHeTHJhhpfAIXW1xY",
  authDomain: "prepcart-prod.firebaseapp.com",
  projectId: "prepcart-prod",
  storageBucket: "prepcart-prod.firebasestorage.app",
  messagingSenderId: "60659278182",
  appId: "1:60659278182:web:90b5b603a46cf22a1968a7",
  measurementId: "G-LGPYPWN70K",
};

let app;
try {
  app = getApp();
} catch {
  app = initializeApp(firebaseConfig);
}

export const db = getFirestore(app);
export { app };
export default firebaseConfig;
