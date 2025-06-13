import { auth } from "@/firebaseConfig";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
});

export async function authenticate() {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const signInResult = await GoogleSignin.signIn();
  const idToken = signInResult?.data?.idToken;

  if (!idToken) {
    throw new Error("No ID token found");
  }

  const googleCredential = GoogleAuthProvider.credential(idToken);
  const response = await signInWithCredential(auth, googleCredential);
  return response;
}
