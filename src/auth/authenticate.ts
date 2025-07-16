import { auth } from "@/firebaseConfig";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import {
  AppleAuthProvider,
  GoogleAuthProvider,
  signInWithCredential,
} from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

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

export async function authenticateWithApple() {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  const { identityToken, nonce } = appleAuthRequestResponse;

  // can be null in some scenarios
  if (identityToken) {
    // 3). create a Firebase `AppleAuthProvider` credential
    const appleCredential = AppleAuthProvider.credential(identityToken, nonce);

    // 4). use the created `AppleAuthProvider` credential to start a Firebase auth request,
    //     in this example `signInWithCredential` is used, but you could also call `linkWithCredential`
    //     to link the account to an existing user
    const userCredential = await signInWithCredential(auth, appleCredential);

    // user is now signed in, any Firebase `onAuthStateChanged` listeners you have will trigger
    console.warn(
      `Firebase authenticated via Apple, UID: ${userCredential.user.uid}`,
    );
    if (!userCredential.user.displayName) {
      return { isAnonymous: true };
    }
    return { isAnonymous: false };
  } else {
    throw new Error("Apple authentication failed");
  }
}
