import { firebase } from "@react-native-firebase/app";
import "@react-native-firebase/auth";
import "@react-native-firebase/firestore";
import Constants from "expo-constants";

// Firebase configuration
// const firebaseConfig = {
//   apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
//   authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
//   projectId: Constants.expoConfig?.extra?.firebaseProjectId,
//   storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket,
//   messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
//   appId: Constants.expoConfig?.extra?.firebaseAppId,
//   measurementId: Constants.expoConfig?.extra?.firebaseMeasurementId,
// };

// Initialize Firebase
let app;
if (!firebase.apps.length) {
  app = firebase.initializeApp();
} else {
  app = firebase.app();
}

// Export Firebase services
export const auth = firebase.auth();
export const db = firebase.firestore();
export const analytics = firebase.analytics();
export default firebase;
