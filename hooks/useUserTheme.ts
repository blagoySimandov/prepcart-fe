import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

const THEME_KEY = "user_theme";

export function useUserTheme() {
  const systemTheme = useColorScheme() ?? "light";
  const [theme, setTheme] = useState<string>(systemTheme);

  useEffect(() => {
    AsyncStorage.getItem(THEME_KEY).then((storedTheme) => {
      if (storedTheme === "light" || storedTheme === "dark") {
        setTheme(storedTheme);
      } else {
        setTheme(systemTheme);
      }
    });
  }, [systemTheme]);

  const setUserTheme = async (newTheme: "light" | "dark") => {
    await AsyncStorage.setItem(THEME_KEY, newTheme);
    setTheme(newTheme);
  };
  return [theme as "light" | "dark", setUserTheme] as const;
}
