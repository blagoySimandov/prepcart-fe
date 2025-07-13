import { useUserTheme } from "./useUserTheme";

export function useColorScheme() {
  const [theme] = useUserTheme();
  return theme;
}
