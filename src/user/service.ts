import { db } from "@/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { DiscountService } from "../discounts/service";
import { ShoppingListService } from "./shopping-list/manager";

/**
 * Provides access to all user-related data services.
 * This class is instantiated for a specific, authenticated user.
 */
export class UserService {
  public shoppingList: ShoppingListService;
  public discounts: DiscountService;
  private userId: string;

  constructor(userId: string) {
    if (!userId) {
      throw new Error("Cannot initialize UserService without a user ID.");
    }
    this.userId = userId;
    this.shoppingList = new ShoppingListService(userId);
    this.discounts = new DiscountService();
  }

  /**
   * Retrieves the user's profile data from Firestore.
   * @returns {Promise<any | null>} A promise that resolves with the user's profile data, or null if not found.
   */
  async getProfile(): Promise<any | null> {
    const userDocRef = doc(db, "users", this.userId);
    try {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
      return null;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  }

  /**
   * Checks if a user profile exists in Firestore and creates it if it doesn't.
   * This is useful for saving initial user data upon first sign-in.
   * @param userData - The basic user data from the authentication provider.
   */
  async createUserProfileIfNotExists(userData: {
    email?: string | null;
    displayName?: string | null;
    photoURL?: string | null;
  }): Promise<void> {
    const userDocRef = doc(db, "users", this.userId);
    try {
      const docSnap = await getDoc(userDocRef);
      if (!docSnap.exists()) {
        // Document doesn't exist, so this is a new user. Create the profile.
        await setDoc(userDocRef, {
          id: this.userId,
          email: userData.email,
          displayName: userData.displayName,
          photoURL: userData.photoURL,
          createdAt: new Date(),
        });
      }
    } catch (error) {
      console.error("Error creating user profile:", error);
      throw error;
    }
  }
}
