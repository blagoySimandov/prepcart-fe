import "@react-native-firebase/analytics";
import { firebase } from "@react-native-firebase/app";
import "@react-native-firebase/auth";
import "@react-native-firebase/firestore";
import "@react-native-firebase/remote-config";

if (!firebase.apps.length) {
  firebase.initializeApp();
} else {
  firebase.app();
}

// Export Firebase services
export const auth = firebase.auth();
export const db = firebase.firestore();
export const analytics = firebase.analytics();
export const remoteConfig = firebase.remoteConfig();
export default firebase;
