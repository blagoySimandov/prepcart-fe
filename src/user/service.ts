import { ShoppingListService } from "./shopping-list/manager";

/**
 * Provides access to all user-related data services.
 * This class is instantiated for a specific, authenticated user.
 */
export class UserService {
  public shoppingList: ShoppingListService;

  constructor(userId: string) {
    if (!userId) {
      throw new Error("Cannot initialize UserService without a user ID.");
    }

    this.shoppingList = new ShoppingListService(userId);
    // Other services like 'profile' or 'settings' could be initialized here
  }
}
