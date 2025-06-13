import { useAuth } from "@/src/auth/hooks";
import { useEffect, useState } from "react";
import { UserService } from "./service";

/**
 * A hook that provides an instance of the UserService
 * for the currently authenticated user.
 *
 * @returns {UserService | null} An instance of UserService, or null if the user is not authenticated.
 */
export function useUserService(): UserService | null {
  const { user } = useAuth();
  const [userService, setUserService] = useState<UserService | null>(null);

  useEffect(() => {
    if (user) {
      setUserService(new UserService(user.uid));
    } else {
      setUserService(null);
    }
  }, [user]);

  return userService;
}
