import { db } from "@/firebaseConfig";
import { User } from "./types";
import { collection, doc, setDoc } from "firebase/firestore";

const userCollection = "users";

export class UserManager {
  static getUserCollection() {
    return collection(db, userCollection);
  }

  static getUserDocument(userId: string) {
    const usersCol = collection(db, userCollection);
    return doc(usersCol, userId);
  }

  static async saveUser(user: User) {
    if (!user.id) {
      throw new Error("User ID is required to save a user.");
    }
    const userRef = this.getUserDocument(user.id);
    return await setDoc(userRef, user, { merge: true });
  }
}
