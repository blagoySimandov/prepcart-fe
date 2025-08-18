import "@react-native-firebase/analytics";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/auth";
import "@react-native-firebase/firestore";
import "@react-native-firebase/remote-config";
import type { FirestoreCollections } from "@/src/utils/types";

if (!firebase.apps.length) {
  firebase.initializeApp();
} else {
  firebase.app();
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export const analytics = firebase.analytics();
export const remoteConfig = firebase.remoteConfig();

export function getTypedCollection<K extends keyof FirestoreCollections>(
  collectionName: K
) {
  return db.collection(collectionName);
}

export function getTypedDocument<K extends keyof FirestoreCollections>(
  collectionName: K,
  documentId: string
) {
  return getTypedCollection(collectionName).doc(documentId);
}

export default firebase;