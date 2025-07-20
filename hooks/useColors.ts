import { useColorScheme } from "./useColorScheme";
import { Colors } from "@/constants/colors";

export function useColors() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  return colors;
}
