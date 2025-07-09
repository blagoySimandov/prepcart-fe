import { useAuth } from "@/src/auth/hooks";
import React, { createContext, useContext, useMemo } from "react";
import { UserService } from "./service";

interface UserServiceContextType {
  userService: UserService | null;
}

const UserServiceContext = createContext<UserServiceContextType>({
  userService: null,
});

interface UserServiceProviderProps {
  children: React.ReactNode;
}

export function UserServiceProvider({ children }: UserServiceProviderProps) {
  const { user } = useAuth();

  const userService = useMemo(() => {
    if (user?.uid) {
      return new UserService(user.uid);
    }
    return null;
  }, [user?.uid]);

  return (
    <UserServiceContext.Provider value={{ userService }}>
      {children}
    </UserServiceContext.Provider>
  );
}

export function useUserService(): UserService | null {
  const context = useContext(UserServiceContext);
  return context.userService;
}
