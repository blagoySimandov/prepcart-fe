import { auth, db } from "@/firebaseConfig";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import {
  AppleAuthProvider,
  deleteUser,
  GoogleAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  updateProfile,
  type FirebaseAuthTypes,
} from "@react-native-firebase/auth";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  writeBatch,
} from "@react-native-firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";
import { UserService } from "../user/service";
import { authenticate, authenticateWithApple } from "./authenticate";

export function useAuth() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userService = new UserService(user.uid);
        await userService.createUserProfileIfNotExists({
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      }
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      return await authenticate();
    } catch (error) {
      console.error("Error during sign in with Google:", error);
      throw error;
    }
  };

  const signInWithApple = async () => {
    try {
      return await authenticateWithApple();
    } catch (error) {
      console.error("Error during sign in with Apple:", error);
      throw error;
    }
  };

  const updateDisplayName = async (displayName: string) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("No authenticated user found");
      }

      await updateProfile(currentUser, { displayName });

      const userDocRef = doc(db, "users", currentUser.uid);

      await updateDoc(userDocRef, {
        displayName: displayName,
      });

      setUser({ ...currentUser, displayName });
    } catch (error) {
      console.error("Error updating display name:", error);
      throw error;
    }
  };

  const reauthenticateUser = async (): Promise<boolean> => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("No authenticated user found");
      }

      // Check which provider the user used to sign in
      const providerId = currentUser.providerData[0]?.providerId;

      if (providerId === "google.com") {
        // Re-authenticate with Google
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
        const signInResult = await GoogleSignin.signIn();
        const idToken = signInResult?.data?.idToken;

        if (!idToken) {
          throw new Error("No ID token found during reauthentication");
        }

        const googleCredential = GoogleAuthProvider.credential(idToken);
        await reauthenticateWithCredential(currentUser, googleCredential);
        return true;
      } else if (providerId === "apple.com") {
        // Re-authenticate with Apple
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        const { identityToken, nonce } = appleAuthRequestResponse;

        if (identityToken) {
          const appleCredential = AppleAuthProvider.credential(
            identityToken,
            nonce,
          );
          await reauthenticateWithCredential(currentUser, appleCredential);
          return true;
        }
      }

      throw new Error(
        `Unsupported provider for reauthentication: ${providerId}`,
      );
    } catch (error) {
      console.error("Error during reauthentication:", error);
      return false;
    }
  };

  const deleteAccount = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("No authenticated user found");
      }

      const userId = currentUser.uid;

      const batch = writeBatch(db);

      const userDocRef = doc(db, "users", userId);
      batch.delete(userDocRef);

      const historyCollectionRef = collection(
        db,
        "users",
        userId,
        "shoppingHistory",
      );
      const historySnapshot = await getDocs(historyCollectionRef);
      historySnapshot.forEach((historyDoc) => {
        batch.delete(historyDoc.ref);
      });

      await batch.commit();

      await deleteUser(currentUser);

      console.log("User account and data successfully deleted");
    } catch (error: any) {
      console.error("Error deleting user account:", error);

      if (error.code === "auth/requires-recent-login") {
        throw new Error("REQUIRES_REAUTHENTICATION");
      }

      throw error;
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error during sign out:", error);
      throw error;
    }
  };

  const isSignedIn = () => {
    return !!auth.currentUser;
  };

  return {
    user,
    loading,
    signInWithGoogle,
    signInWithApple,
    updateDisplayName,
    deleteAccount,
    reauthenticateUser,
    signOut,
    isSignedIn,
  };
}
