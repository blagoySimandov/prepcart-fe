import { useState } from "react";
import { ShoppingListManager } from "./manager";
import { ShoppingItem } from "./types";
const USER_TEST_ID = "user-test-id";

export const useShoppingList = () => {
  const [items, setItems] = useState<ShoppingItem[]>([
    // Mock data for demonstration
    {
      id: "1",
      name: "Tomatoes",
      quantity: "3 lbs",
      category: "Produce",
      completed: false,
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Bread",
      quantity: "1 loaf",
      category: "Bakery",
      completed: true,
      createdAt: new Date(),
    },
  ]);

  const addItem = (name: string, quantity: string, category: string) => {
    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: name.trim(),
      quantity: quantity.trim(),
      category: category.trim(),
      completed: false,
      createdAt: new Date(),
    };
    console.log("Adding new item to shopping list:", newItem);
    setItems((prev) => [...prev, newItem]);
    ShoppingListManager.saveList([...items, newItem], USER_TEST_ID);
  };

  const toggleItem = (id: string) => {
    setItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      );
      ShoppingListManager.saveList(updated, USER_TEST_ID);
      return updated;
    });
  };

  const deleteItem = (id: string) => {
    setItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      ShoppingListManager.saveList(updated, USER_TEST_ID);
      return updated;
    });
  };

  const clearCompleted = () => {
    setItems((prev) => {
      const updated = prev.filter((item) => !item.completed);
      ShoppingListManager.saveList(updated, USER_TEST_ID);
      return updated;
    });
  };

  return {
    items,
    addItem,
    toggleItem,
    deleteItem,
    clearCompleted,
  };
};
