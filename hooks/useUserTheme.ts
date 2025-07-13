import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Appearance, useColorScheme } from "react-native";

const THEME_KEY = "user_theme";
export type UserTheme = "light" | "dark";
export function useUserTheme() {
  const systemTheme = useColorScheme() ?? "light";

  const [theme, setTheme] = useState<UserTheme>(systemTheme);

  useEffect(() => {
    AsyncStorage.getItem(THEME_KEY).then((storedTheme) => {
      if (storedTheme === "light" || storedTheme === "dark") {
        setTheme(storedTheme);
      } else {
        setTheme(systemTheme);
      }
    });
  }, [systemTheme]);

  const setUserTheme = async (newTheme: UserTheme) => {
    await AsyncStorage.setItem(THEME_KEY, newTheme);
    Appearance.setColorScheme(newTheme);
    setTheme(newTheme);
  };

  return [theme!, setUserTheme] as const;
}
