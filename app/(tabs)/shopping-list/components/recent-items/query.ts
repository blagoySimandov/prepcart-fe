import { db } from "@/firebaseConfig";
import { BaseShoppingListItem } from "@/src/user/shopping-list";
import { QueryFunction } from "@tanstack/react-query";

export const fetchRecentItems: QueryFunction<
  BaseShoppingListItem[],
  string[]
> = async ({ queryKey }) => {
  const [, userId] = queryKey;

  if (!userId) {
    return [];
  }

  const snapshot = await db
    .collection(`users/${userId}/shoppingHistory`)
    .orderBy("createdAt", "desc")
    .limit(5)
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name || '',
      quantity: data.quantity || 0,
      unit: data.unit || ''
    };
  });
};
