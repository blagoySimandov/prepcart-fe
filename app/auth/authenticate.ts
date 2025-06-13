import fauth, { signInWithCredential } from "firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { auth } from "@/firebaseConfig";

export async function authenticate() {
  GoogleSignin.configure({
    webClientId: "autoDetect",
  });
  const response = await GoogleSignin.signIn();
  if (response.type === "success") {
    const googleCredential = fauth.GoogleAuthProvider.credential(
      response.data.idToken,
    );
    return signInWithCredential(auth, googleCredential);
  } else {
    throw Error("Authentication failed.");
  }
}
