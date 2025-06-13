import { auth } from "@/firebaseConfig";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { authenticate } from "./authenticate";

export class AuthManager {
  language: string;

  constructor(language: string = "en", scopes: string = "") {
    this.language = language;
  }

  private updateLanguage() {
    auth.languageCode = this.language;
  }
  public async isSignedIn() {
    return !!auth.currentUser;
  }

  public async getCurrentUser() {
    return auth.currentUser;
  }

  public onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }

  public async signInWithGoogle() {
    this.updateLanguage();
    const credential = await authenticate();
    const user = credential?.user;
    const token = credential?.user.getIdTokenResult();
    return { token, user };
  }

  public async signOut() {
    return signOut(auth);
  }
}
