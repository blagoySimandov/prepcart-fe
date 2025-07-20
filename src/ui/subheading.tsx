import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet, Text } from "react-native";

interface SubheadingProps {
  children: string;
  style?: any;
}

export function Subheading({ children, style }: SubheadingProps) {
  const theme = useColorScheme();
  const colors = Colors[theme || "light"];
  const styles = useStyles(colors);

  return <Text style={[styles.subheading, style]}>{children}</Text>;
}

function useStyles(colors: any) {
  return StyleSheet.create({
    subheading: {
      fontSize: 16,
      color: colors.icon,
      lineHeight: 22,
    },
  });
}
