import { useState } from "react";
import { UserProfile } from "./types";

export const useUserProfile = () => {
  const [profile] = useState<UserProfile>({
    name: "Food Lover",
    email: "user@prepcart.com",
    memberSince: new Date("2024-01-15"),
    recipesImported: 12,
    shoppingListsCreated: 8,
  });

  const updateProfile = async (updates: Partial<UserProfile>) => {
    // TODO: Implement profile update API call
    console.log("Updating profile:", updates);
  };

  return { profile, updateProfile };
};
