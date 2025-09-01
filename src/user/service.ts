import { db } from "@/firebaseConfig";
import {
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "@react-native-firebase/firestore";
import { DiscountService } from "../discounts/service";
import { ShoppingListService } from "./shopping-list/manager";

/**
 * Provides access to all user-related data services.
 * This class is instantiated for a specific, authenticated user.
 */
export class UserService {
  public shoppingList: ShoppingListService;
  public discounts: DiscountService;
  public userId: string;

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
   * Updates the user's aggregated statistics in Firestore.
   * @param {number} discoveredDiscounts - The number of new discounts found.
   */
  async updateUserStatistics(discoveredDiscounts: number): Promise<void> {
    const userDocRef = doc(db, "users", this.userId);

    try {
      if (discoveredDiscounts > 0) {
        await updateDoc(userDocRef, {
          "statistics.totalDiscoveredDiscounts": increment(discoveredDiscounts),
        });
      }
    } catch (error) {
      console.error("Error updating user statistics:", error);
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
    country?: string | null;
  }): Promise<void> {
    const userDocRef = doc(db, "users", this.userId);
    try {
      const docSnap = await getDoc(userDocRef);
      if (!docSnap.exists()) {
        // Build the data object conditionally
        const data: any = {
          id: this.userId,
          createdAt: new Date(),
          statistics: {
            totalDiscoveredDiscounts: 0,
            totalSavings: {},
          },
        };

        if (userData.email !== undefined && userData.email !== null) {
          data.email = userData.email;
        }
        if (
          userData.displayName !== undefined &&
          userData.displayName !== null
        ) {
          data.displayName = userData.displayName;
        }
        if (userData.photoURL !== undefined && userData.photoURL !== null) {
          data.photoURL = userData.photoURL;
        }
        if (userData.country !== undefined && userData.country !== null) {
          data.country = userData.country;
        }

        await setDoc(userDocRef, data);
      }
    } catch (error) {
      console.error("Error creating user profile:", error);
      throw error;
    }
  }

  /**
   * Updates the user's country in Firestore.
   * @param country - The country to set for the user.
   */
  async updateCountry(country: string): Promise<void> {
    const userDocRef = doc(db, "users", this.userId);
    try {
      await updateDoc(userDocRef, {
        country: country,
      });
    } catch (error) {
      console.error("Error updating user country:", error);
      throw error;
    }
  }
}
