import { db } from "@/firebaseConfig";
import { doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
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
   * @param {Record<string, number>} savings - The potential savings from the new discounts.
   */
  async updateUserStatistics(
    discoveredDiscounts: number,
    savings: Record<string, number>
  ): Promise<void> {
    const userDocRef = doc(db, "users", this.userId);

    try {
      const fieldsToUpdate: { [key: string]: any } = {};

      if (discoveredDiscounts > 0) {
        fieldsToUpdate["statistics.totalDiscoveredDiscounts"] =
          increment(discoveredDiscounts);
      }

      for (const currency in savings) {
        if (savings[currency] > 0) {
          fieldsToUpdate[`statistics.totalSavings.${currency}`] = increment(
            savings[currency]
          );
        }
      }

      if (Object.keys(fieldsToUpdate).length > 0) {
        await updateDoc(userDocRef, fieldsToUpdate);
      }
    } catch (error) {
      console.error("Error updating user statistics:", error);
      // Fallback for safety, though createUserProfileIfNotExists should prevent this.
      try {
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists())
          throw new Error("User doc not found on fallback");
        const userData = userDoc.data();
        const stats = userData.statistics || {
          totalDiscoveredDiscounts: 0,
          totalSavings: {},
        };

        stats.totalDiscoveredDiscounts += discoveredDiscounts;
        for (const currency in savings) {
          stats.totalSavings[currency] =
            (stats.totalSavings[currency] || 0) + savings[currency];
        }

        await updateDoc(userDocRef, { statistics: stats });
      } catch (fallbackError) {
        console.error("Fallback statistics update failed:", fallbackError);
      }
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
          statistics: {
            totalDiscoveredDiscounts: 0,
            totalSavings: {},
          },
        });
      }
    } catch (error) {
      console.error("Error creating user profile:", error);
      throw error;
    }
  }
}
